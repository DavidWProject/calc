"use strict";

//First we grab the DOM elements. 
const keys = document.querySelectorAll(".bottom span");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clearBtn");

//Additional parameters
let decimalAdded = false;
let operation = "";
let output;

const operators = ["+", "-", "x", "÷"];

clearBtn.addEventListener("click", clearField);
deleteBtn.addEventListener("click", deleteInput);
keys.forEach(key => {
  key.addEventListener("click", onKeyPress);
  key.addEventListener("click", evaluate);
});

function clearField() {
  input.innerHTML = "";
  result.innerHTML = "";
  operation = "";
}

function deleteInput (e) {

  if (e.ctrlKey) {
    operation = "";
    output = "";
    input.innerHTML = operation;
    result.innerHTML = output;
    return;
  }

  operation = operation.slice(0, -1);
  input.innerHTML = operation;
}

function onKeyPress (e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(key) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && key === "-") {
    operation += key;
    input.innerHTML = operation;
    return;
  }

  if (operation.length === 0 && operators.indexOf(key) !== -1) {
    input.innerHTML = operation;
    return;
  }

  if (operators.indexOf(key) !== -1 && operators.indexOf(lastChar) !== -1) {
    operation = operation.replace(/.$/, key);
    input.innerHTML = operation;
    return;
  }

  if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
    input.innerHTML = operation;
    return;
  }

}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    output = "";
    result.innerHTML = output;
    return;
  }

  try {

    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    output = +(eval(final)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = `${output}`;
      output = "";
      input.innerHTML = operation;
      result.innerHTML = output;
      return;
    }

    result.innerHTML = output;

  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${operation}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }
}