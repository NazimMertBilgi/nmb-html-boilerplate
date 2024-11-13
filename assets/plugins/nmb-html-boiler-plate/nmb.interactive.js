document.addEventListener("DOMContentLoaded", function () {

    class NMBInteractiveHandler {
        constructor(scriptId) {
            this.scriptElement = document.getElementById(scriptId);
            this.init(scriptId);
        }

        async init(scriptId) {
            const scriptSrc = document.querySelector('script#' + scriptId).src;
            if (scriptSrc && scriptSrc !== null && scriptSrc !== "") {
                const scriptContent = await this.fetchScriptContent();
                this.scriptElement.textContent = scriptContent;
            }
            this.variables = {};
            this.variablesLastContents = [];
            if (!this.scriptElement) {
                console.error(`Script with id '${scriptId}' not found.`);
                return;
            }
            this.initVariables();
            this.createProxies();
            this.updateDOM();
            this.nmbInteractiveLoadedEvent();
        }

        async fetchScriptContent() {
            return await fetch(this.scriptElement.src).then(response => response.text())
        }

        initVariables() {
            try {
                const variableMatches = this.scriptElement.textContent.match(/(const|let|var) (\w+) = ['"(](.*?)['")]/g);
                if (variableMatches) {
                    variableMatches.forEach(variableDeclaration => {
                        const match = variableDeclaration.match(/(const|let|var) (\w+) = ['"()](.*?)['")]/);
                        if (match) {
                            this.variables[match[2]] = match[3];
                            this.variablesLastContents.push({ key: match[2], value: match[3] });
                        }
                    });
                }
                this.variables = Object.entries(this.variables);
            } catch (e) {
                console.error("Failed to parse JSON from script element:", e);
            }
        }

        createProxies() {
            this.variables.forEach(([key, value]) => {
                window[key] = new Proxy({ value: value }, {
                    set: (target, property, value, animation) => {
                        target[property] = value;
                        this.handleVariableChange(key, value);
                        this.updateVariableInDOM(key, value);
                        return false;
                    }
                });
            });

        }

        handleVariableChange(key, value) {
            const variableLastContent = this.variablesLastContents.find(item => item.key === key);
            if (value === variableLastContent.value) {
                return false;
            }
            const event = new CustomEvent('nmbInteractiveVariableChanged', { detail: { variable: key, newValue: value, oldValue: variableLastContent.value } });
            document.dispatchEvent(event);
        }

        updateVariableInDOM(key, value) {
            const elementsToUpdate = document.querySelectorAll("body *");
            elementsToUpdate.forEach(element => {
                const attrId = `nmb-interactive-id`;
                const attr2Id = `nmb-interactive-extra-feature`;
                const variableLastContent = this.variablesLastContents.find(item => item.key === key);
                if (variableLastContent) {
                    const elementsWithAttrId = document.querySelectorAll(`[${attrId}="${variableLastContent.key}"]`);
                    elementsWithAttrId.forEach(el => {
                        const extraFeature = el.getAttribute(attr2Id);
                        if (el.hasAttribute(attr2Id)) {
                            if (extraFeature === "num") {
                                const expression = variableLastContent.value;
                                const result = eval(expression);
                                el.innerHTML = el.innerHTML.replace(result, value);
                            }
                            else if (extraFeature === "bool") {
                                const expression = variableLastContent.value;
                                const result = eval(expression) ? true : false;
                                el.innerHTML = el.innerHTML.replace(result, value);
                            }
                            else if (extraFeature === "attr") {
                                let attributes = el.attributes;
                                for (let i = 0; i < attributes.length; i++) {
                                    if (attributes[i].value === variableLastContent.value) {
                                        el.setAttribute(attributes[i].name, value);
                                    }
                                }
                                el.outerHTML = el.outerHTML;
                            }
                            else {
                                el.innerHTML = el.innerHTML.replace(variableLastContent.value, value);
                            }
                        } else {
                            el.innerHTML = el.innerHTML.replace(variableLastContent.value, value);
                        }
                    });
                    variableLastContent.value = value;
                }
            });
        }

        updateDOM() {
            const regex = /\{{(.*?)\}}/g;
            const elements = document.querySelectorAll("body *");
            elements.forEach(element => {
                if (element.children.length === 0) {
                    let outerHTML = element.outerHTML;
                    let match;
                    while ((match = regex.exec(outerHTML)) !== null) {
                        let variableName = match[1].trim();

                        if (variableName.startsWith("num(") && variableName.endsWith(")")) {
                            let doubleVariableName = variableName.slice(4, -1).trim();
                            const expression = variableName.slice(4, -1);
                            try {
                                const result = eval(expression);
                                const attrId = `nmb-interactive-id`;
                                const attr2Id = `nmb-interactive-extra-feature`;
                                const variable = this.variables.find(([key]) => key === doubleVariableName);
                                if (variable) {
                                    element.setAttribute(attrId, variable[0]);
                                    element.setAttribute(attr2Id, "num");
                                }
                                outerHTML = element.innerHTML.replace(match[0], result);
                                element.innerHTML = outerHTML;
                            } catch (e) {
                                console.error("Failed to evaluate expression:", e);
                            }
                        }
                        else if (variableName.startsWith("bool(") && variableName.endsWith(")")) {
                            let doubleVariableName = variableName.slice(5, -1).trim();
                            const expression = variableName.slice(5, -1);
                            try {
                                const result = eval(expression) ? true : false;
                                const attrId = `nmb-interactive-id`;
                                const attr2Id = `nmb-interactive-extra-feature`;
                                const variable = this.variables.find(([key]) => key === doubleVariableName);
                                if (variable) {
                                    element.setAttribute(attrId, variable[0]);
                                    element.setAttribute(attr2Id, "bool");
                                }
                                outerHTML = element.innerHTML.replace(match[0], result);
                                element.innerHTML = outerHTML;
                            } catch (e) {
                                console.error("Failed to evaluate expression:", e);
                            }
                        }
                        else if (variableName.startsWith("attr(") && variableName.endsWith(")")) {
                            let attrVariableName = variableName.slice(5, -1).trim();
                            const attrId = `nmb-interactive-id`;
                            const attr2Id = `nmb-interactive-extra-feature`;
                            const variable = this.variables.find(([key]) => key === attrVariableName);
                            if (variable) {
                                element.setAttribute(attrId, variable[0]);
                                element.setAttribute(attr2Id, "attr");
                            }

                            let attributes = element.attributes;
                            for (let i = 0; i < attributes.length; i++) {
                                if (attributes[i].value === match[0]) {
                                    element.setAttribute(attributes[i].name, variable[1]);
                                }
                            }
                        }
                        else {
                            const variable = this.variables.find(([key]) => key === variableName);
                            if (variable) {
                                const attrId = `nmb-interactive-id`;
                                element.setAttribute(attrId, variable[0]);
                                outerHTML = element.innerHTML.replace(match[0], variable[1]);
                                element.innerHTML = outerHTML;
                            }
                        }
                    }
                }
            });
        }

        nmbInteractiveLoadedEvent() {
            const event = new CustomEvent('nmbInteractiveLoaded', { detail: { isLoaded: true } });
            document.dispatchEvent(event);
        }
    }

    new NMBInteractiveHandler("nmb-html-boiler-plate-js");

});
