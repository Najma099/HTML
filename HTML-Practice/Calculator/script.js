let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// Function to evaluate mathematical expressions
function evaluateExpression(expression) {
    try {
        const operators = /[+\-*/]/g;
        const numbers = expression.split(operators).map(Number);
        const operations = expression.match(operators);

        if (!operations || numbers.length - 1 !== operations.length) {
            throw new Error("Invalid Expression");
        }

        let result = numbers[0];
        for (let i = 0; i < operations.length; i++) {
            switch (operations[i]) {
                case '+':
                    result += numbers[i + 1];
                    break;
                case '-':
                    result -= numbers[i + 1];
                    break;
                case '*':
                    result *= numbers[i + 1];
                    break;
                case '/':
                    if (numbers[i + 1] === 0) return "Error"; 
                    result /= numbers[i + 1];
                    break;
                default:
                    throw new Error("Invalid Operator");
            }
        }
        return result;
    } catch {
        return "Error"; 
    }
}

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = evaluateExpression(string).toString(); 
            input.value = string;
        } else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});
