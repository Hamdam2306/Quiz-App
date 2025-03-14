// src/index.ts
var num1El = document.getElementById("num1");
var operationEl = document.getElementById("operation");
var num2El = document.getElementById("num2");
var buttons = document.querySelectorAll("#num");
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let correctAnswer = 0;
  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = parseFloat((num1 / num2).toFixed(2));
      break;
  }
  num1El.innerText = num1.toString();
  operationEl.innerText = operator;
  num2El.innerText = num2.toString();
  let answers = [correctAnswer];
  while (answers.length < 4) {
    let fakeAnswer = Math.floor(Math.random() * 40) + 1;
    if (!answers.includes(fakeAnswer)) {
      answers.push(fakeAnswer);
    }
  }
  answers.sort(() => Math.random() - 0.5);
  buttons.forEach((button, index) => {
    button.innerText = answers[index].toString();
    button.dataset.correct = (answers[index] == correctAnswer).toString();
    button.onclick = () => checkAnswer(button);
  });
}
function checkAnswer(button) {
  if (button.dataset.correct === "true") {
    alert("✅ Togri javob!");
    generateQuestion();
  } else {
    alert("❌ Xato! Qayta urinib koring.");
  }
}
document.addEventListener("DOMContentLoaded", generateQuestion);
