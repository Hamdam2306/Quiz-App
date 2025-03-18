// src/elements.ts
var number1Elm = document.querySelector("#number1");
var number2Elm = document.querySelector("#number2");
var operationElm = document.querySelector("#operation");
var answersWrapper = document.querySelector(".answers-wrapper");
var orderElm = document.querySelector(".order");
var timerElm = document.querySelector(".timer");
var pointsWrapper = document.querySelector(".points-wrapper");

// src/constants.ts
var MAX_NUMBER = 50;
var ANSWER_INTERVAL = 20;
var MAX_QUESTION_COUNT = 10;
var answerCls = {
  correct: "answer-correct",
  incorrect: "answer-incorrect"
};
var pointCls = {
  correct: "point-correct",
  incorrect: "point-incorrect",
  unanswered: "point-unanswered"
};

// src/db.ts
var state = {
  questions: [],
  currentQuestionIdx: 0
};
function generateNumber(maxNumber) {
  const number = Math.floor(Math.random() * maxNumber);
  return number;
}
function generateOperation() {
  const operations = ["*", "+", "-"];
  const randomIdx = generateNumber(3);
  const operation = operations[randomIdx];
  return operation;
}
function calculateAnswer(number1, number2, operation) {
  switch (operation) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "*":
      return number1 * number2;
  }
}
function generateAnswers(correctAnswer) {
  const answers = new Set([correctAnswer]);
  while (answers.size !== 4) {
    const randomAnswer = generateNumber(correctAnswer + ANSWER_INTERVAL);
    answers.add(randomAnswer);
  }
  return Array.from(answers).sort(() => Math.random() - 0.5);
}
function getNextQuestion() {
  if (state.questions.length === MAX_QUESTION_COUNT)
    return;
  const number1 = generateNumber(MAX_NUMBER);
  const number2 = generateNumber(MAX_NUMBER);
  const operation = generateOperation();
  const correctAnswer = calculateAnswer(number1, number2, operation);
  const answers = generateAnswers(correctAnswer);
  const question = {
    number1,
    number2,
    operation,
    correctAnswer,
    answers,
    selectedAnswer: null,
    status: "unanswered"
  };
  state.questions.push(question);
  state.currentQuestionIdx = state.questions.length - 1;
  return question;
}
function getCurrentQuestion() {
  const currentQuestion = state.questions[state.currentQuestionIdx];
  return currentQuestion;
}
function checkAnswer(selectedAnswer) {
  const question = getCurrentQuestion();
  const isCorrect = selectedAnswer === question.correctAnswer;
  question.status = isCorrect ? "correct" : "incorrect";
  question.selectedAnswer = selectedAnswer;
  resetTimeLeft();
}
function getOrder() {
  const order = state.currentQuestionIdx + 1;
  return order;
}
function changeQuestion(questionIdx) {
  state.currentQuestionIdx = questionIdx;
}

// src/index.ts
var timeLeft2 = 10;
function resetTimeLeft() {
  timeLeft2 = 11;
}
function handleSelectAnswer(e) {
  const answerBtn = e.target;
  const selectedAnswer = +answerBtn.dataset.value;
  checkAnswer(selectedAnswer);
  const question = getCurrentQuestion();
  const answerBtns = Array.from(answersWrapper.children);
  answerBtns.forEach((btn) => {
    const answer = +btn.dataset.value;
    if (answer === question.correctAnswer)
      btn.classList.add(answerCls.correct);
    btn.disabled = true;
  });
  answerBtn.classList.add(answerCls[question.status]);
  renderPoints();
  setTimeout(init, 1000);
}
function handleSelectQuestion(e) {
  const pointElm = e.target;
  const questionIdx = +pointElm.dataset.value;
  if (state.questions.length !== MAX_QUESTION_COUNT)
    return;
  changeQuestion(questionIdx);
  const question = getCurrentQuestion();
  renderQuiz(question);
}
function renderQuiz(question) {
  renderQuestion(question);
  renderAnswers(question);
  renderOrder();
  renderPoints();
}
function renderQuestion({ number1, number2, operation }) {
  number1Elm.innerText = number1.toString();
  number2Elm.innerText = number2.toString();
  operationElm.innerText = operation;
}
function renderAnswers({ answers }) {
  const fragment = document.createDocumentFragment();
  for (let i = 0;i < answers.length; i++) {
    const answer = answers[i];
    const answerBtn = document.createElement("button");
    answerBtn.className = "answer-btn";
    answerBtn.innerText = answer.toString();
    answerBtn.dataset.value = answer.toString();
    answerBtn.addEventListener("click", handleSelectAnswer);
    fragment.append(answerBtn);
  }
  answersWrapper.replaceChildren(fragment);
}
function renderOrder() {
  const order = getOrder();
  orderElm.innerText = order.toString();
}
function renderPoints() {
  const fragment = document.createDocumentFragment();
  for (let i = 0;i < state.questions.length; i++) {
    const question = state.questions[i];
    const pointElm = document.createElement("button");
    pointElm.classList.add("point", pointCls[question.status]);
    pointElm.innerText = `${i + 1}`;
    pointElm.dataset.value = i.toString();
    pointElm.addEventListener("click", handleSelectQuestion);
    fragment.append(pointElm);
  }
  pointsWrapper.replaceChildren(fragment);
}
function init() {
  const question = getNextQuestion();
  if (question) {
    renderQuiz(question);
    startTimer();
  }
}
var interval;
function startTimer() {
  if (interval)
    clearInterval(interval);
  timerElm.innerText = `${timeLeft2}s`;
  interval = window.setInterval(() => {
    if (timeLeft2 > 0) {
      timeLeft2--;
      timerElm.innerText = `${timeLeft2}s`;
    } else {
      clearInterval(interval);
      interval = undefined;
      timeLeft2 = 10;
      init();
    }
  }, 1000);
}
window.addEventListener("load", init);
export {
  timeLeft2 as timeLeft,
  startTimer,
  resetTimeLeft,
  init
};
