const helloWorld = "Hello World!";
const firstImg = "assets/img/cat.jpeg";
let calculate = (2*2); // we must enclose the relevant calculation in brackets.
const calculateText = "2 * 5";

changeHelloWorldText = () => {
    window.helloWorld.value = "Hello World! Changed!"
    window.firstImg.value = "assets/img/clouds.jpg";
    window.calculateText.value = "3 * 5";
    window.calculate.value = (3 * 5);
}

document.addEventListener('nmbInteractiveLoaded', function (e) {
    console.log(`nmbInteractiveLoaded: ${e.detail.isLoaded}`);
});

document.addEventListener('nmbInteractiveVariableChanged', function (e) {
    console.table(`nmbInteractiveVariableChanged:`, e.detail);
});