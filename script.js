const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;
	
	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			displayInput.innerHTML = "";
			displayOutput.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			displayInput.innerHTML = CleanInput(input);
		} else if (value == "=") {
			let result = eval(PerpareInput(input));

			displayOutput.innerHTML = CleanOutput(result);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
				input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

			displayInput.innerHTML = CleanInput(input);
		} else {
			if (ValidateInput(value)) {
				input += value;
				displayInput.innerHTML = CleanInput(input);
			}
		}
	})
}

function CleanInput(input) {
	let inputArr = input.split("");
	let inputArrLength = inputArr.length;

	for (let i = 0; i < inputArrLength; i++) {
		if (inputArr[i] == "*") {
			inputArr[i] = ` <span class="operator">x</span> `;
		} else if (inputArr[i] == "/") {
			inputArr[i] = ` <span class="operator">÷</span> `;
		} else if (inputArr[i] == "+") {
			inputArr[i] = ` <span class="operator">+</span> `;
		} else if (inputArr[i] == "-") {
			inputArr[i] = ` <span class="operator">-</span> `;
		} else if (inputArr[i] == "(") {
			inputArr[i] = `<span class="brackets">(</span>`;
		} else if (inputArr[i] == ")") {
			inputArr[i] = `<span class="brackets">)</span>`;
		} else if (inputArr[i] == "%") {
			inputArr[i] = `<span class="percent">%</span>`;
		}
	}

	return inputArr.join("");
}

function CleanOutput (output) {
	let outputString = output.toString();
	let decimal = outputString.split(".")[1];
	    outputString = outputString.split(".")[0];
	let outputArr = outputString.split("");
	
	if (outputArr.length > 3) {
		for (let i = outputArr.length - 3; i > 0; i -= 3) {
			outputArr.splice(i, 0, ",");
		}
	}

	if (decimal) {
		outputArr.push(".");
		outputArr.push(decimal);
	}

	return outputArr.join("");
}

function ValidateInput (value) {
	let lastInput = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && lastInput == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(lastInput)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input) {
	let inputArr = input.split("");
	for (let i = 0; i < inputArr.length; i++) {
		if (inputArr[i] == "%") {
			inputArr[i] = "/100";
		}
	}

	return inputArr.join("");
}