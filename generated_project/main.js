document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('calc-display');
    let currentInput = '';
    let operator = null;
    let previousValue = null;

    const OPERATORS = ['+', '-', '*', '/'];
    const ERROR_MESSAGE = 'Error: Div by 0';
    
    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
    }

    // Function to handle numbers being appended to the display
    function handleNumber(value) {
        currentInput += value;
        updateDisplay(currentInput);
    }

    // Function to register the operator type
    function handleOperator(op) {
        if (currentInput !== '') {
            previousValue = parseFloat(currentInput);
            currentInput = '';
        }
        operator = op;
    }

    // Function to perform the arithmetic operation
    function calculate() {
        if (currentInput !== '' && previousValue !== null && operator !== null) {
            const currentValue = parseFloat(currentInput);
            let result;

            switch (operator) {
                case '+':
                    result = previousValue + currentValue;
                    break;
                case '-':
                    result = previousValue - currentValue;
                    break;
                case '*':
                    result = previousValue * currentValue;
                    break;
                case '/':
                    if (currentValue === 0) {
                        updateDisplay(ERROR_MESSAGE);
                        return;
                    }
                    result = previousValue / currentValue;
                    break;
            }

            updateDisplay(result);
            // Reset for next calculation
            currentInput = '';
            previousValue = null;
            operator = null;
        }
    }

    // Function to handle button clicks
    function handleButtonClick(value) {
        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (OPERATORS.includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        } else if (value === 'B') {
            backspace();
        }
    }

    // Function to clear the display and reset the calculator
    function clear() {
        currentInput = '';
        operator = null;
        previousValue = null;
        updateDisplay('');
    }

    // Function to handle backspace and remove the last digit
    function backspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }

    // Function to handle decimal inputs
    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    }

    // Function to handle keyboard inputs
    function handleKeyboardInput(event) {
        const key = event.key;
        if (!isNaN(key) || key === '.') {
            handleButtonClick(key);
        } else if (OPERATORS.includes(key)) {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === 'Escape') {
            handleButtonClick('C');
        } else if (key === '.') {
            handleDecimal();
        } else if (key === 'Backspace') {
            backspace();
        }
    }

    // Add event listeners to each button
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(button.getAttribute('data-value'));
        });
    });

    // Add event listener for keyboard input
    document.addEventListener('keydown', handleKeyboardInput);
});