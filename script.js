const operandButtons = document.querySelectorAll(".operand");


const buttons = document.querySelectorAll("button");
const background = document.querySelector(".background");

// calculator object that contains everything calculator needs
const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};


function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) { //when an operator button has been clicked
        //overwrite the display value property and set it to the digit that is clicked
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        //Overwrites `displayValue` if the current value is 0, otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0.";
        calculator.waitingForSecondOperand = false;
        return;
    }
    //If the `displayValue` property does not contain a decimal point
    if (!calculator.displayValue.includes(".")) {
        //Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator;
    // `parseFloat` converts the string contents of `displayValue` to a floating-point number
    const inputValue = parseFloat(displayValue);

    //update the `operator` property if another operator button is clicked consecutively
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    //Verify that `firstOperand` is null and that the `inputValue` is not a `Nan` value
    if (firstOperand === null && !isNaN(inputValue)) {
        //update the firstOperand property
        calculator.firstOperand = inputValue;
    } else if (operator) { // if `operator` property has been assigned a value

        const result = operate(firstOperand, inputValue, operator)
        //set `displayValue` property to the `result`
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        //reassign the `firstOperand` property to the result (aka the current `displayValue` for the next operation)
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator; // sets operator property to whatever operator key was clicked

    console.log(calculator);
}

function operate(firstOperand, secondOperand, operator) {

    switch (operator) {
        case "+":
            return add(firstOperand, secondOperand);
        case "-":
            return subtract(firstOperand, secondOperand);
        case "*":
            return multiply(firstOperand, secondOperand);
        case "/":
            return divide(firstOperand, secondOperand);
        default:
            return secondOperand;
    }
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
function updateDisplay() {
    //select display element(calculator screen)
    const display = document.querySelector(".display");
    //update value of element to content of "displayValue" calculator object property
    display.value = calculator.displayValue
}
updateDisplay();

function deleteChar() {
    const { displayValue } = calculator;
    if (displayValue > "0") {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    } else {
        return;
    }
}

window.addEventListener("keydown", handleKeyboardInput)

background.addEventListener("click", (event) => {
    const { target } = event;
    const { value } = target;
    //same as const target = event.target (look up destructuring assignment)

    //Check if clicked element is a button
    //If not, exit from the function
    if (!target.matches(".button")) {
        return;
    }

    if (target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    
    if (target.classList.contains("clear-btn")) {
        resetCalculator();
        updateDisplay();
        return;
    }
    
    if (target.classList.contains("delete")) {
        console.log(target.classList)
        deleteChar();
        updateDisplay();
        return;
    }
    
    inputDigit(target.value);
    updateDisplay();


    // REFACTORED CODE
    // switch (value) {
        //     case "+":
        //     case "-":
        //     case "*":
    //     case "/":
    //     case "=":
    //         handleOperator(value);
    //         break;
    //     case ".":
    //         inputDecimal(value);
    //         break;
    //     case "clear":
    //         resetCalculator()
    //         break;
    //     case "delete":
    //         deleteChar()
    //         break;
    //     default:
    //         //check if the key is an integer
    //         if (Number.isInteger(parseFloat(value))) {
    //             inputDigit(value);
    //         }
    // }
});

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <=9) {
        inputDigit(e.key);
        updateDisplay();
        return;
    } 
    if (e.key === "."){
        inputDecimal(e.key);
        updateDisplay()
        return;
    } 
    if (e.key === "=" || e.key === "Enter"){
        handleOperator(e.key);
        updateDisplay();
        return;
    } 
    if (e.key === "Backspace"){
        deleteChar();
        updateDisplay();
        return;
    }
    if (e.key === "Escape"){
        resetCalculator();
        updateDisplay();
        return;
    } 
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        handleOperator(e.key);
        updateDisplay();
        return;
    } 
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
