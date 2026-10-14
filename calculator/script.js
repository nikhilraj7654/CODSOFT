const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];
let string = "";
let justCalculated = false;   // result aane ke baad naya number likhna ho to purana hata do

function show() {
    inputBox.value = string;
}

function calculate() {
    if (string === "") return;

    // 5+ jaisa adhura expression ho to last operator hata do
    if (operators.includes(string.slice(-1))) {
        string = string.slice(0, -1);
    }

    // 007 ko 7 banao (warna JavaScript 010 ko octal samajhta hai)
    const cleaned = string.replace(/(^|[+\-*/])0+(\d)/g, "$1$2");

    try {
        const result = eval(cleaned);   // buttons se hi input aata hai, isliye yahan safe hai
        if (!isFinite(result)) throw new Error("Invalid");   // 5/0 par Error
        string = String(Number(result.toFixed(10)));          // 0.1+0.2 = 0.3 dikhane ke liye
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
            // last number ko 100 se divide karo (50 -> 0.5)
            string = string.replace(/(\d+\.?\d*)$/, n => String(parseFloat(n) / 100));
            show();
        }
        else if (operators.includes(value)) {
            if (string === "") return;                 // operator se shuru nahi hoga
            justCalculated = false;                    // result ke aage operator laga sakte ho
            if (operators.includes(string.slice(-1))) {
                string = string.slice(0, -1);          // 5+- ho jaye to last wala badal do
            }
            string += value;
            show();
        }
        else {
            // digit ya dot
            if (justCalculated) {
                string = "";
                justCalculated = false;
            }
            if (value === ".") {
                const lastNumber = string.split(/[+\-*/]/).pop();
                if (lastNumber.includes(".")) return;  // 1.2.3 nahi
                if (lastNumber === "") string += "0";  // .5 ki jagah 0.5
            }
            string += value;
            show();
        }
    });
});
