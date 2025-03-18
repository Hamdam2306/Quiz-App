// src/index.ts
var num1El = document.getElementById("num1");
var operationEl = document.getElementById("operation");
var num2El = document.getElementById("num2");
var buttons = document.querySelectorAll("#num");
var countEl = document.getElementById("count");
var timerEl = document.getElementById("timer");
var amountAnswers = 0;
var timeLeft = 15;
function generateQuestion() {
  if (amountAnswers === 10) {
    return;
  }
  amountAnswers++;
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
  countEl.innerHTML = String(amountAnswers);
  answers.sort(() => Math.random() - 0.5);
  buttons.forEach((button, index) => {
    button.innerText = answers[index].toString();
    button.dataset.correct = (answers[index] == correctAnswer).toString();
    button.onclick = () => checkAnswer(button);
  });
  startTimer();
}
function checkAnswer(button) {
  if (button.dataset.correct === "true") {
    timeLeft = 15;
    alert("✅ Togri javob!");
  } else {
    timeLeft = 15;
    alert("❌ Xato! Qayta urinib koring.");
  }
  generateQuestion();
}
function startTimer() {
  timerEl.innerText = `${timeLeft}s`;
  let interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.innerText = `${timeLeft}s`;
    } else {
      clearInterval(interval);
      timeLeft = 15;
      generateQuestion();
    }
  }, 1000);
}
document.addEventListener("DOMContentLoaded", () => {
  generateQuestion();
});
