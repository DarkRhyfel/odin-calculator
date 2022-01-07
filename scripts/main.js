// Initializing variables
let screenContent = '';
let isResult = false;

const allowedKeys = [8, 13, 27];
const allowedRegex = /^[\d\.\-\/\*\+]/gm;

const screen = document.querySelector('.screen');

// Populate keys with functions
function keyPressed(e) {
    if (e.type === 'keyup' && e.key.match(allowedRegex) === null && !allowedKeys.includes(e.keyCode)) {
        return;
    }

    let keyText = e.type === 'click' ? e.target.textContent : e.key;

    let current = screenContent.trim().split(' ');

    if (isNaN(keyText)) {
        if (screenContent === '') {
            return;
        } else if (keyText === 'C' || keyText === 'Escape') {
            screenContent = '';
            isResult = false;
        } else if (keyText === '←' || keyText === 'Backspace') {
            if (isNaN(current.at(-1))) {
                screenContent = screenContent.trim().slice(0, -1).trim();
            } else if (!isResult) {
                screenContent = screenContent.slice(0, -1);
            } else {
                screenContent = '';
                isResult = false;
            }
        } else if (keyText === '=' || keyText === 'Enter') {
            if (current.length === 1 || current.length % 2 === 0) {
                return;
            } else {
                while (current.length > 1) {
                    let operation = current.splice(0, 3).map(value => !isNaN(value) ? Number(value) : value);

                    let result = operate(...operation);

                    current.unshift(result);
                }

                screenContent = (Math.round(current[0] * 100) / 100).toString();
                isResult = true;
            }
        } else if (keyText === '.') {
            if (isNaN(current.at(-1)) || current.at(-1).includes('.') || isResult) {
                return;
            } else {
                screenContent += keyText;
            }
        } else {
            if (keyText === '/') {
                keyText = '÷';
            }

            if (keyText === '*') {
                keyText = '×';
            }

            if (isNaN(current.at(-1))) {
                screenContent = `${current.slice(0, -1).join(' ')} ${keyText} `;
            } else {
                screenContent = `${screenContent} ${keyText} `;
            }

            isResult = false;
        }
    } else {
        if (isResult) {
            screenContent = keyText;
            isResult = false;
        } else {
            screenContent += keyText;
        }
    }

    screen.textContent = screenContent;
}

const keys = document.querySelectorAll('.key, .key-2, .key-3');

keys.forEach(key => key.addEventListener('click', keyPressed));

document.body.addEventListener('keyup', keyPressed);

// Basic Math Functions

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
    return b === 0 ? 'Mathematical Error!' : a / b;
}

// Execute operation from calculator
function operate(num1, operation, num2) {
    switch (operation) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
        default:
            return 'Syntax Error!';
    }
}