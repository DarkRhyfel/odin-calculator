// Initializing variables
let screenContent = '';
let isResult = false;

const screen = document.querySelector('.screen');

// Populate keys with functions
function keyPressed(e) {
    let keyText = e.target.textContent;

    let current = screenContent.trim().split(' ').map(value => !isNaN(value) ? Number(value) : value);

    if (isNaN(keyText)) {
        if (screenContent === '') {
            return;
        } else if (keyText === 'C') {
            screenContent = '';
            isResult = false;
        } else if (keyText === '=') {
            if (current.length === 1 || current.length % 2 === 0) {
                return;
            } else {
                while (current.length > 1) {
                    let operation = current.splice(0, 3);

                    let result = operate(...operation);

                    current.unshift(result);
                }

                screenContent = current[0].toString();
                isResult = true;
            }
        } else {
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
    return b === 0 ? 'Mathematical Error!' : Math.round((a / b) * 100) / 100;
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