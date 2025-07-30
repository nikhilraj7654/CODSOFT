const inputBox = document.getElementById("inputBox");
const buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML == "=") {
            try {
                string = eval(string);   // calculate the result
                inputBox.value = string;
            } catch {
                inputBox.value = "Error";
                string = "";
            }
        } 
        else if (e.target.innerHTML == "AC") {
            string = "";
            inputBox.value = string;
        } 
        else if (e.target.innerHTML == "DEL") {
            string = string.slice(0, -1);
            inputBox.value = string;
        } 
        else {
            string += e.target.innerHTML;
            inputBox.value = string;
        }
    });
});