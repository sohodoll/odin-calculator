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
const decimalButton = document.querySelector('.decimal');
const undoButton = document.querySelector('.undo');

let curNum = '';

undoButton.addEventListener('click', () => {
    if (curNum.length >= 1) {
        curNum = curNum.slice(0, -1);
        display.textContent = curNum;
    }
});

const listenForButtons = () => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (curNum.includes('.')) {
                decimalButton.textContent = '';
            }
            curNum += button.textContent;
            display.textContent = curNum; 
        })
    })
}

window.addEventListener('keydown', (event) => {
    if (event.code.includes('Digit') && curNum.length < 9) {
        curNum += event.key;
        display.textContent = curNum;123
    }
    if (event.key == 'Backspace') {
        curNum = curNum.slice(0, -1);
        display.textContent = curNum;
    }
})

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
            console.log(curOperator);
            if (curOperator === '') {
                curOperator = operator.textContent;
                firstNum = curNum;
                curNum = '';
                decimalButton.textContent = '.';
            } if (curOperator !== '' && curNum !== '') {
                    secondNum = curNum;
                    currentResult = operate(curOperator, firstNum, secondNum);
                    firstNum = currentResult;
                    if (currentResult % 1 != 0) {
                        firstNum = (Math.round(currentResult * 100) / 100).toFixed(2);
                    }
                    display.textContent = firstNum;
                    curNum = '';
                    decimalButton.textContent = '.';
            }
            curOperator = operator.textContent;
            display.textContent = firstNum + curOperator;
            if (currentResult == Infinity || isNaN(currentResult)) {
                display.textContent = 'Nice try'
            };
        })
    })
}

const manageEqual = () => {
    equalButton.addEventListener('click', () => {
        secondNum = curNum;
        if(firstNum && secondNum) {
            currentResult = operate(curOperator, firstNum, secondNum);
            firstNum = currentResult;
            if (currentResult % 1 != 0) {
                firstNum = (Math.round(currentResult * 100) / 100).toFixed(2);
            }
            display.textContent = firstNum;
            if (currentResult == Infinity || isNaN(currentResult)) {
                display.textContent = 'Nice try'
            };
            curNum = '';
            decimalButton.textContent = '.';
        };
    });
};

//--handle clear button and reset

const reset = () => {
    curNum = '';
    curOperator = '';
    firstNum = '';
    secondNum = '';
    currentResult = '';
    display.textContent = '';
    decimalButton.textContent = '.';
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
