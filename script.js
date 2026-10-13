const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];
let string = "";
let justCalculated = false;

function show() {
    inputBox.value = string;
}

function calculate() {
    if (string === "") return;

    if (operators.includes(string.slice(-1))) {
        string = string.slice(0, -1);
    }

    const cleaned = string.replace(/(^|[+\-*/])0+(\d)/g, "$1$2");

    try {
        const result = eval(cleaned);
        if (!isFinite(result)) throw new Error("Invalid");
        string = String(Number(result.toFixed(10)));
        justCalculated = true;
    } catch {
        inputBox.value = "Error";
        string = "";
        return;
    }
    show();
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerHTML;

        if (value === "=") {
            calculate();
        }
        else if (value === "AC") {
            string = "";
            justCalculated = false;
            show();
        }
        else if (value === "DEL") {
            string = string.slice(0, -1);
            show();
        }
        else if (value === "%") {
            string = string.replace(/(\d+\.?\d*)$/, n => String(parseFloat(n) / 100));
            show();
        }
        else if (operators.includes(value)) {
            if (string === "") return;
            justCalculated = false;
            if (operators.includes(string.slice(-1))) {
                string = string.slice(0, -1);
            }
            string += value;
            show();
        }
        else {
            if (justCalculated) {
                string = "";
                justCalculated = false;
            }
            if (value === ".") {
                const lastNumber = string.split(/[+\-*/]/).pop();
                if (lastNumber.includes(".")) return;
                if (lastNumber === "") string += "0";
            }
            string += value;
            show();
        }
    });
});
