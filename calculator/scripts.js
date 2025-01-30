// Basic Functions
function add(n1,n2) {
    return n1+n2;
}

function subtract(n1,n2) {
    return n1-n2;
}

function multiply(n1,n2) {
    return n1*n2;
}

function divide(n1,n2) {
    if (n2 == 0) return "lol no";
    return n1/n2
}

// Values are inputed as string, so we convert them to numbers to operate on them
function operate(n1,operator,n2) {
    const n1num = Number(n1);
    const n2num = Number(n2)
    const operatorLower = operator.toLowerCase();
    let result = 0;
    switch(operatorLower) {
        case "+":
            result = add(n1num,n2num);
            break;
        case "-":
            result = subtract(n1num,n2num);
            break;
        case "x":
            result = multiply(n1num,n2num);
            break;
        case "/":
            result = divide(n1num,n2num);
            break;
        case "=":
            result = n1num;
            break;
        default:
            return "No operation found";
    }
    result = Math.round(result*10000000000)/10000000000; // round result to max 9 figures
    return result.toString();
}

const display = document.querySelector("#display");
let displayValue = display.textContent;

// Initialize memory
memory = {
    n1: "",
    operand: "",
    n2: "",
}
// Add event listeners to all input cells and initizialize calculator
const inputCells = document.querySelectorAll(".input.number, .input.operator, .input.changer");
inputCells.forEach((inputCell) => {
    inputCell.addEventListener(("click"), (event) => {
        const NewInput = event.target.textContent;
        const inputType = getInputType(event);
        memory = manageInput(memory, NewInput, inputType);
        display.textContent = updateDisplay(memory);
        toggleSeparatorInput(display.textContent);
    })
})

// Update memory based on input type, and return the new memory
function updateNum (memory, newNum) {
    if (memory.operand === "") {
        memory.n1 = memory.n1 === "0" ? newNum : memory.n1 + newNum;
    }
    else {
        memory.n2 = memory.n2 === "0" ? newNum : memory.n2 + newNum;
    };
    return memory;
}

function updateOperand (memory, operand) {
    if (memory.operand === "") {
        memory.operand += operand;
    }
    else {
        newMemoryN1 = operate(memory.n1, memory.operand, memory.n2);
        memory.n1 = newMemoryN1;
        memory.operand = "";
        memory.n2 = "";
    };
    return memory;
}

function updateChanger(memory, changer) {
    switch(changer) {
        case "AC":
                memory.n1 = "0";
                memory.operand = "";
                memory.n2 = "";
            break;
        case "+/-":
                if (memory.n2 === "") {
                    memory.n1 = (-memory.n1).toString();
                }
                else {
                    memory.n2 = (-memory.n2).toString();
                }
            break;
        case "%":
            if (memory.n2 === "") {
                memory.n1 = (memory.n1/100).toString();
            }
            else {
                memory.n2 = (memory.n2/100).toString();
            }
            break;
        default:
            console.log("Unexpected changer");
    }
    return memory;
}

// Check the input type, and route it to the right function
function manageInput(memory, input, inputType) {
    switch(inputType) {
        case "operator":
            memory = updateOperand(memory,input);
            break;
        case "number":
            memory = updateNum(memory, input);
            break;
        case "changer":
            memory = updateChanger(memory,input);
            break;
        default:
            console.log("Unexpected inputType");
    }
    return memory
}

// Update the display based on the most recent memory. 
// If n2 is not empty, we use it as the display value. Otherwise, we use n1
function updateDisplay(memory) {
    let newValue = ""
    memory.n2 !== "" ? newValue = memory.n2 : newValue = memory.n1; 
    return newValue;
}

function getInputType(event) {
    let inputType = "";
    let inputClasses = [...event.target.classList]; // we convert the classlist (a DOM object) to an array
    if (inputClasses.includes("number")) {
        inputType = "number";
    }
    else if (inputClasses.includes("operator")){
        inputType = "operator";
    }
    else if (inputClasses.includes("changer")) {
        inputType = "changer";
    }
    else {
        inputType = "Couldn't find operator class";
    }
    return inputType;
}

function toggleSeparatorInput(displayValue) {
    const separatorButton = document.querySelector("#dot");
    const isSeparatorOnDisplay = displayValue.includes(".") 
    const isSeparatorDisabled = separatorButton.classList.contains("clickDisabled");
    if (isSeparatorOnDisplay && isSeparatorDisabled || !isSeparatorOnDisplay && !isSeparatorDisabled) {
        return;
    }
    else if (isSeparatorOnDisplay && !isSeparatorDisabled) {
        separatorButton.classList.add("clickDisabled")
        //Disable separator click
    }
    else if (!isSeparatorOnDisplay && isSeparatorDisabled) {
        // Enable separator click
        separatorButton.classList.remove("clickDisabled")
    }
    else {
        console.log("Error in toggleSeparatorInput");
    }
    return;
}