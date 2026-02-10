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
  console.log(sum);
  result = sum;
  equals(result);
};

//this looks clean now
const equals = (result) => {
  isResultDisplayed = true;
  updateDisplay(result);
  str1 = result.toString();
  str2 = "";
  operatorCount = 0;
  operator = "";
  console.log(
    `Equal function: str1: ${str1} str2: ${str2} Operator-count: ${operatorCount} Operator: ${operator}`,
  );
  console.log("current result:" + result);
};

const clearAll = () => {
  bottomDisplayNumber.textContent = "0";
  str1 = "";
  operator = "";
  operatorCount = 0;
  str2 = "";
  result = null;
  isResultDisplayed = false;
};

const clearLast = () => {
  let strRemovedLastChar = bottomDisplayNumber.textContent.slice(0, -1);
  bottomDisplayNumber.textContent = strRemovedLastChar;

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

// I think this logical is now clean
const updateDisplay = (content) => {
  console.log("result is displayed: " + isResultDisplayed);
  const isDefault = bottomDisplayNumber.textContent.trim() === "0";
  if ((isDefault && isInitial && result === null) || isResultDisplayed) {
    isInitial = false;
    console.log("clear display");
    bottomDisplayNumber.textContent = "";
    bottomDisplayNumber.textContent = content;
  } else {
    bottomDisplayNumber.textContent += content;
  }
};

const isOperator = (value) => {
  return ["+", "-", "*", "/"].includes(value);
};

const isNotOperator = (value) => {
  return !["+", "-", "*", "/", "=", "ac", "cl"].includes(value);
};

let round = 0;
const getButtonValue = (event) => {
  round++;
  console.log("Round: " + round);

  console.log("before block:" + isResultDisplayed);

  const value = event.target.closest(".calculator__button").dataset.value;

  if (isResultDisplayed && isNotOperator(value)) {
    str1 = "";
    bottomDisplayNumber.textContent = "";
  }
  // Check a number was typed, if not . is not possible to use
  if ((value === "." && str1 === "") || dotCount > 1) {
    return;
  }

  //this controls what happens when sombebody inputs =
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
      console.log("test2");
      let str1NoOperator = bottomDisplayNumber.textContent.slice(0, -1);
      bottomDisplayNumber.textContent = str1NoOperator;
    }

    //this handle chains 2+2+
    if (str1 !== "" && str2 !== "") {
      console.log("test3");
      handleOperation(str1, operator, str2);
    }
    operator = value; // Set NEW operator
    operatorCount = 1;
    isResultDisplayed = false;
    updateDisplay(value);
    console.log("operator count: " + operatorCount);
    console.log("Saved to operator: " + value);
  } else if (operator) {
    console.log("test4");
    str2 += value;
    updateDisplay(value);
    console.log("Saved to numb2: " + value);
  } else {
    str1 += value;
    updateDisplay(value);
    console.log("Saved to numb1: " + value);
  }

  console.log("Displayed number: " + bottomDisplayNumber.textContent);
  //   console.log(operatorCount + "<count current operator>" + operator);

  console.log(
    `end function: str1: ${str1} str2: ${str2} Operator-count: ${operatorCount} Operator: ${operator}`,
  );
  console.log(bottomDisplayNumber);
  console.log(isResultDisplayed);
};
buttons.addEventListener("click", getButtonValue);

//fix you cant star a number with zero
//when result  is zero or in general a number an then clicking . => bug
