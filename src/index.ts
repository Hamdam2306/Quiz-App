const num1El = document.getElementById("num1") as HTMLElement;
const operationEl = document.getElementById("operation") as HTMLElement;
const num2El = document.getElementById("num2") as HTMLElement;
const buttons = document.querySelectorAll("#num") as NodeListOf<HTMLButtonElement>;

function generateQuestion() {
  const num1: number = Math.floor(Math.random() * 20) + 1;
  const num2: number = Math.floor(Math.random() * 20) + 1;
  const operators: string[] = ["+", "-", "*", "/"];
  const operator: string =
    operators[Math.floor(Math.random() * operators.length)];

  let correctAnswer: number = 0;

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

  let answers: number[] = [correctAnswer];
  while (answers.length < 4) {
    let fakeAnswer: number = Math.floor(Math.random() * 40) + 1;
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

function checkAnswer(button: HTMLButtonElement) {
  if (button.dataset.correct === "true") {
    alert("✅ Togri javob!");
    generateQuestion();
  } else {
    alert("❌ Xato! Qayta urinib koring.");
  }
}







document.addEventListener("DOMContentLoaded", generateQuestion);



