const buttons = document.querySelector(".calculator__controls");
const bottomDisplayNumber = document.querySelector(
  ".calculator__display__number--bottom",
);

let str1 = "";
let operator = "";
let str2 = "";
let result = null;
let operatorCount = 0;
let dotCount = 0;
let isResultDisplayed = false;
let isInitial = true;

const add = (num1, num2) => {
  let sum = num1 + num2;
  result = sum;
  equals(result);
};

const subtract = (num1, num2) => {
  let sum = num1 - num2;
  result = sum;
  equals(result);
};

const divide = (num1, num2) => {
  if (!num1 || !num2) {
    alert("Fuck you, for trying to crash my calculator :)");
  } else {
    let sum = num1 / num2;
    result = sum;
    equals(result);
  }
};

const multiply = (num1, num2) => {
  let sum = num1 * num2;
  result = sum;
  equals(result);
};

const modulo = (num1, num2) => {
  let sum = num1 % num2;
  result = sum;
  equals(result);
};

const equals = (result) => {
  let resultRounded = parseFloat(result.toFixed(2)).toString();
  isResultDisplayed = true;
  updateDisplay(resultRounded);
  str1 = resultRounded;
  str2 = "";
  operatorCount = 0;
  operator = "";
};

const clearAll = () => {
  bottomDisplayNumber.textContent = "0";
  str1 = "";
  operator = "";
  operatorCount = 0;
  str2 = "";
  result = null;
  isResultDisplayed = false;
  isInitial = true;
  resizeText();
};

const clearLast = () => {
  //removes last character from display
  let strRemovedLastCharDisplay = bottomDisplayNumber.textContent.slice(0, -1);
  //removes last character from saved str1
  str1 = str1.slice(0, -1);
  bottomDisplayNumber.textContent = strRemovedLastCharDisplay;
  isInitial = true;
  if (bottomDisplayNumber.textContent === "") {
    bottomDisplayNumber.textContent = 0;
  }
};

const handleOperation = (str1, operator, str2) => {
  //Parses both string parts to numbers to use them for operations
  let num1 = parseFloat(str1);
  let num2 = parseFloat(str2);

  switch (operator) {
    case "+":
      add(num1, num2);
      break;
    case "-":
      subtract(num1, num2);
      break;
    case "*":
      multiply(num1, num2);
      break;
    case "/":
      divide(num1, num2);
      break;
    case "%":
      modulo(num1, num2);
      break;
  }
};

//handles calling Delete all and delete last
const handleCommand = (operator) => {
  switch (operator) {
    case "ac":
      clearAll();
      break;
    case "cl":
      clearLast();
      break;
  }
};

const updateDisplay = (content) => {
  resizeText();
  const isDefault = bottomDisplayNumber.textContent.trim() === "0";
  if ((isDefault && isInitial && result === null) || isResultDisplayed) {
    isInitial = false;
    bottomDisplayNumber.textContent = "";
    bottomDisplayNumber.textContent = content;
  } else {
    bottomDisplayNumber.textContent += content;
  }
};

const isNotOperator = (value) => {
  return !["+", "-", "*", "/", "=", "ac", "cl", "%"].includes(value);
};

//Handles number resizing for big numbers
const resizeText = () => {
  if (bottomDisplayNumber.textContent.trim().length > 24) {
    bottomDisplayNumber.style.fontSize = "14px";
  } else if (bottomDisplayNumber.textContent.trim().length > 15) {
    bottomDisplayNumber.style.fontSize = "24px";
  } else if (bottomDisplayNumber.textContent.trim().length > 11) {
    bottomDisplayNumber.style.fontSize = "34px";
  } else if (bottomDisplayNumber.textContent.trim().length > 7) {
    bottomDisplayNumber.style.fontSize = "44px";
  } else {
    bottomDisplayNumber.style.fontSize = "64px";
  }
};

const getButtonValue = (event) => {
  const value = event?.target.closest(".calculator__button")?.dataset.value;
  // Makes sure when user clicks between the buttons, no error is thrown
  if (value === null || value === undefined) return;
  // Checks if str1 is empty if, its not possible to enter 0
  if (str1 === "" && value === "0") {
    return;
  }
  resizeText();

  //Resets screen when result is shown and next input is a number
  if (isResultDisplayed && isNotOperator(value)) {
    str1 = "";
    bottomDisplayNumber.textContent = "";
    isResultDisplayed = false;
  }

  //Checks for all dot/decimal cases
  if (value === ".") {
    if (operatorCount === 0) {
      if (str1 === "") {
        str1 = "0.";
        bottomDisplayNumber.textContent = str1;
        isResultDisplayed = false;
      }
      if (str1.includes(".")) {
        //
        return; // Then prevent adding another one
      }
    } else if (str1 !== "" && operator) {
      return; //Then prevent adding .
    } else {
      if (str2.includes(".")) {
        //
        return; // Then prevent adding another one
      }
    }
  }

  //this controls what happens when user inputs =
  if (value === "=") {
    if (str1 !== "" && operator !== "" && str2 !== "") {
      handleOperation(str1, operator, str2);
    } else return;
  } else if (value === "ac" || value === "cl") {
    handleCommand(value);
  } else if (
    value === "+" ||
    value === "/" ||
    value === "-" ||
    value === "*" ||
    value === "%"
  ) {
    //this prevent that user from typing operator when str1 is empty
    if (str1 === "") {
      return;
    }
    //This helps to remove the current operator, and replace it with the second clicked operator first 6+- will be 6- swap
    if (str1 !== "" && operator !== "" && str2 === "") {
      let str1NoOperator = bottomDisplayNumber.textContent.slice(0, -1);
      bottomDisplayNumber.textContent = str1NoOperator;
    }

    //this handle chains 2+2+
    if (str1 !== "" && str2 !== "") {
      handleOperation(str1, operator, str2);
    }
    operator = value;
    operatorCount = 1;
    isResultDisplayed = false;
    updateDisplay(value);
  } else if (operator) {
    str2 += value;
    updateDisplay(value);
  } else {
    str1 += value;
    updateDisplay(value);
  }
};
buttons.addEventListener("click", getButtonValue);
