const inputDisplay = document.querySelector('#input');
const resultDisplay = document.querySelector('#result');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const divideButton = document.querySelector('#divide');
const multiplyButton = document.querySelector('#multiply');
const clearButton = document.querySelector('#clear');
const plusOrMinusButton = document.querySelector('#plus-or-minus');
const equalsButton = document.querySelector('#equals');
const numerals = document.querySelectorAll('.numeral');
const operators = document.querySelectorAll('.operator');
const workingOperators = document.querySelectorAll('.working-operator');
const numeralsAndOperators = document.querySelectorAll('.numeral', '.operator');
const decimalButton = document.querySelector('#decimal');

const numRegex = /\d+/;
let operator = '';
let numberArray = [];
let operatorArray = [];
let resultShowing = false;

const add = (...args) => {
    return args.reduce((acc, cur) => acc + cur);
}

const subtract = (...args) => {
    return args.reduce((acc, cur) => acc - cur);
}

const divide = (...args) => {
    return args.reduce((acc, cur) => acc / cur);
}

const multiply = (...args) => {
    return args.reduce((acc, cur) => acc * cur);
}

const operate = (operator, num1 = 0, num2 = 0) => {
    // performs appropriate operation function on a pair of numbers
    let value = 0
    switch (operator) {
        case '+':
            value = add(num1, num2);
            break;
        case '-':
            value = subtract(num1, num2);
            break;
        case '÷':
            value = divide(num1, num2);
            break;
        case 'x':
            value = multiply(num1, num2);
            break;
    }
    return value;
}

// Push number into numberArray when a number button is pressed,
// add that number to last index of numberArray if last displayed
// character was a number (checked with a regex), so that multidigit
// numbers will be entered correctly
numerals.forEach((el) => {
    el.addEventListener('click', (e) => {
        // if the result from a previous calculation is displayed, empty numberArray
        if (resultShowing) {
            inputDisplay.innerText = '';
            numberArray = [];
            resultShowing = false;
        }
        if (resultDisplay.innerText.length < 34) {
            //check if previous character on calculator screen was a number; concatenate with previous number if so
            if (numRegex.test(inputDisplay.innerText[inputDisplay.innerText.length - 1])) {
                numberArray[numberArray.length - 1] = (numberArray[numberArray.length - 1] += e.target.innerText);
            } else if (inputDisplay.innerText[inputDisplay.innerText.length - 1] === '.') {
                numberArray[numberArray.length - 1] += e.target.innerText
            } else {
                numberArray.push(parseInt(e.target.innerText));
            }
            console.log(numberArray);
            inputDisplay.innerText += e.target.innerText;
        }
    });
})

operators.forEach((el) => {
    // operator symbol is displayed on screen
    el.addEventListener('click', (e) => inputDisplay.innerText += e.target.innerText);
})

workingOperators.forEach((el) => {
    el.addEventListener('click', (e) => {
        // operator symbol displayed on screen
        // these are called 'working' operators because they are the only ones that have functionality so far
        resultShowing = false;
        operatorArray.push(e.target.innerText);
        console.log(operatorArray);
    })
})

// 
equalsButton.addEventListener('click', () => {
    // loop through numberArray, performing on the first two numbers the operation indicated by the
    // next operator in the operatorArray
    let result = 0;
    let resultDisplayString = ''
    for (let i = 0; i < numberArray.length - 1; i++) {
        resultDisplayString = inputDisplay.innerText;
        numberArray[i + 1] = operate(operatorArray[i], parseFloat(numberArray[i]), parseFloat(numberArray[i + 1]))
        console.log(numberArray)
        result = numberArray[numberArray.length - 1];
    }
    inputDisplay.innerText = result;
    resultDisplay.innerText = resultDisplayString;
    resultShowing = true;
    numberArray = [result];
    operatorArray = [];
})

const clearMemory = () => {
    // resets numberArray and operatorArray to empty
    numberArray = [];
    operatorArray = [];
}

clearButton.addEventListener('click', () => {
    // clear numbers and operators from screen
    resultDisplay.innerText = '';
    inputDisplay.innerText = '';
    clearMemory();
})

decimalButton.addEventListener('click', () => {
    if (!Array.from(numberArray)[numberArray.length - 1].includes('.')) {
        numberArray[numberArray.length - 1] = (numberArray[numberArray.length - 1] + decimalButton.innerText);
        inputDisplay.innerText += '.';
    }
})

