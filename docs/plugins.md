# Plugins

# NMBInteractiveJS (nmb-interactive-js)

The `NMBInteractiveJS` plugin is designed to handle interactive JavaScript elements within an HTML document. It allows for dynamic updates of variables and their corresponding DOM elements.

## Variable Types

NMBInteractiveJS supports 3 variable types; `const` `let` `var`

## Usage

### Basic Usage

follow these steps:

1. **Script file or content** of `NMBInteractiveJS` can be used in two ways.
    ```javascript
    <script id="nmb-html-boiler-plate-js" src="assets/js/home/home.js"></script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
    ```

    or

    ```javascript
    <script id="nmb-html-boiler-plate-js">
    let helloWorld = "Hello World";

    changeHelloWorldText = () => { // For example, it can be triggered from the onclick event of a button.
        window.helloWorld.value = "Hello World! Changed!"
    }
    </script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
     ```

2. **Now let's print the variable helloWorld to the screen.** add it to your related html page.
    ```html
    <h2>{{helloWorld}}</h2> 
    <!-- It is always necessary to use a wrapper. For example, span, p, h2 or others.. -->
    ```

    result

    ```html
    <h2>Hello World</h2>
    ```

3. **Update variable value** to update a value,  
You should wait for the isLoaded value to be returned from the nmbInteractiveLoaded event. Usually true as soon as the page is loaded. You can subscribe to the related event as follows.

```javascript

updateValue = () => {
  window.helloWorld.value = "Hello World! Changed!"
}

// or

function updateValue(){
  window.helloWorld.value = "Hello World! Changed!"
}

document.addEventListener('nmbInteractiveLoaded', function (e) {
    console.log(`nmbInteractiveLoaded: ${e.detail.isLoaded}`);
    if(e.detail.isLoaded === true) {
      updateValue();
    }
});
```

4. **Subscribe to the value of a variable.** you can catch when the value of a variable is updated.
    ```javascript
    document.addEventListener('nmbInteractiveVariableChanged', function (e) {
        console.log(`nmbInteractiveVariableChanged:`, e.detail);
        // detail {
           //variable,
           //newValue,
           //oldValue
        // }
    });
    ```

### variable

1. **JS**
 ```javascript
    <script id="nmb-html-boiler-plate-js">
      let helloWorld = "Hello World";
    </script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
     ```

2. **HTML**
    ```html
    <h2>{{helloWorld}}</h2> 
    ```

3. **Result**
    ```html
    <h2>Hello World</h2> 
    ```

### num(variable)

1. **JS**
```javascript
    <script id="nmb-html-boiler-plate-js">
      let calculate = (2*2); // we must enclose the relevant calculation in brackets.
      let calculate2 = ((2+2) * (4*4));
    </script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
     ```

2. **HTML**
    ```html
    <h2>{{num(calculate)}}</h2> 
    <h2>{{num(calculate2)}}</h2> 
    <h2>{{num(6*6)}}</h2> 
    ```

3. **Result**
    ```html
    <h2>15</h2> 
    <h2>64</h2>
    <h2>36</h2>  
    ```

### bool(variable)

1. **JS**
```javascript
    <script id="nmb-html-boiler-plate-js">
      let isBig = (4>2); // we must enclose the relevant calculation in brackets.
    </script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
     ```

2. **HTML**
    ```html
    <h2>{{bool(isBig)}}</h2> 
    <h2>{{bool(1>2)}}</h2> 
    ```

3. **Result**
    ```html
    <h2>true</h2> 
    <h2>false</h2> 
    ```

### attr(variable)
1. **JS**
```javascript
    <script id="nmb-html-boiler-plate-js">
      let isActiveClass = "open"; // we must enclose the relevant calculation in brackets.
    </script>
    <script src="assets/plugins/nmb-html-boiler-plate/nmb.interactive.js"></script>
     ```

2. **HTML**
    ```html
    <h2 class="{{attr(isActiveClass)}}></h2> 
    ```

3. **Result**
    ```html
    <h2 class="open"></h2> 
    ```

    ## Constructor

### `constructor(scriptId: string)`

- **Parameters:**
  - `scriptId`: The ID of the script element to be handled.

## Methods

### `async init(scriptId: string)`

Initializes the handler by fetching the script content, initializing variables, creating proxies, updating the DOM, and dispatching a custom event.

### `async fetchScriptContent()`

Fetches the content of the script element.

### `initVariables()`

Initializes the variables found within the script content.

### `createProxies()`

Creates proxies for the variables to handle changes and update the DOM accordingly.

### `handleVariableChange(key: string, value: any)`

Handles changes to the variables and dispatches a custom event.

### `updateVariableInDOM(key: string, value: any)`

Updates the DOM elements that are bound to the variables.

### `updateDOM()`

Updates the DOM by replacing placeholders with the corresponding variable values.

### `nmbInteractiveLoaded`

Dispatches a custom event indicating that the interactive script has been loaded.

### `nmbInteractiveVariableChanged`

You can catch when the value of a variable is updated.