//--basic math functions

const add = (a,b) => Number(a) + Number(b);
const subtract = (a,b) => Number(a) - Number(b);
const multiply = (a,b) => Number(a) * Number(b);
const divide = (a,b) => Number(a) / Number(b);

const operate = (operator, a, b) => {
    if (operator == '+') {
        return add(a,b)
    }
    if (operator == '-') {
        return subtract(a,b)
    }
    if (operator == '*') {
        return multiply(a,b)
    }
    if (operator == '/') {
        return divide(a,b)
    }
}

//--populate the display with numbers from the user
const buttons = Array.from(document.querySelectorAll('.calculator__button'));
const display = document.querySelector('.calculator__display');

let curNum = '';

const listenForButtons = () => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
                curNum += button.textContent;
                display.textContent = curNum;
        })
    })
}

listenForButtons();

//--main logic

let firstNum = '';
let secondNum = '';
let curOperator = '';
let currentResult = '';

const operators = Array.from(document.querySelectorAll('.calculator__operator'));
const equalButton = document.querySelector('.equal');

console.log(operators);

const manageOperators = () => {

    operators.forEach(operator => {
        operator.addEventListener('click', () => {
            if (curOperator === '') {
                curOperator = operator.textContent;
                firstNum = curNum;
                curNum = '';
            } if (curOperator !== '') {
                if (curNum !== '') {
                    secondNum = curNum;
                    currentResult = operate(curOperator, firstNum, secondNum);
                    curOperator = operator.textContent;
                    firstNum = currentResult;
                    curNum = '';
                    display.textContent = currentResult;
                }
            }
        })
    })
}

const manageEqual = () => {
    operators.forEach(operator => {
        operator.addEventListener('click', () => {
            curOperator = operator.textContent;
        })
    })
    equalButton.addEventListener('click', () => {
        secondNum = curNum;
        console.log(curOperator, firstNum, secondNum);
        currentResult = operate(curOperator, firstNum, secondNum);
        firstNum = currentResult;
        display.textContent = currentResult;
        curNum = '';
    })
};

//--handle clear button and reset

const reset = () => {
    curNum = '';
    curOperator = '';
    firstNum = '';
    secondNum = '';
    currentResult = '';
    display.textContent = '';
}

const clearButton = document.querySelector('.clear');

const clear = () => {
    clearButton.addEventListener('click', () => {
       reset();
    })
}

clear();
manageOperators();
manageEqual();
