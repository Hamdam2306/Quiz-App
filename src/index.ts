import type { Question } from './types';
import { answersWrapper, number1Elm, number2Elm, operationElm, orderElm, pointsWrapper, timerElm } from './elements';
import { getNextQuestion, checkAnswer, getCurrentQuestion, getOrder, state, changeQuestion, generateAnswers } from './db';
import { answerCls, MAX_QUESTION_COUNT, pointCls } from './constants';

export let timeLeft: number = 10;

export function resetTimeLeft (){
   timeLeft = 11
}


// HANDLE FUNCTIONS
function handleSelectAnswer(e: MouseEvent) {
  const answerBtn = e.target as HTMLButtonElement;
  const selectedAnswer = +answerBtn.dataset.value!;

  checkAnswer(selectedAnswer);
  const question = getCurrentQuestion();

  const answerBtns = Array.from(answersWrapper.children) as HTMLButtonElement[];
  answerBtns.forEach(btn => {
    const answer = +btn.dataset.value!;
    if (answer === question.correctAnswer) btn.classList.add(answerCls.correct);

    btn.disabled = true;
  });

  answerBtn.classList.add(answerCls[question.status as keyof typeof answerCls]);
  renderPoints();
  setTimeout(init, 1000)

}

function handleSelectQuestion(e: MouseEvent) {
  const pointElm = e.target as HTMLButtonElement;
  const questionIdx = +pointElm.dataset.value!;

  if (state.questions.length !== MAX_QUESTION_COUNT) return;

  changeQuestion(questionIdx);
  const question = getCurrentQuestion();
  renderQuiz(question);
}

// UI FUNCTIONS

function renderQuiz(question: Question) {
  renderQuestion(question);
  renderAnswers(question);
  renderOrder();
  renderPoints()
}

function renderQuestion({ number1, number2, operation }: Question) {
  number1Elm.innerText = number1.toString();
  number2Elm.innerText = number2.toString();
  operationElm.innerText = operation;
}

function renderAnswers({ answers }: Question) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];

    const answerBtn = document.createElement('button');

    answerBtn.className = 'answer-btn';
    answerBtn.innerText = answer.toString();
    answerBtn.dataset.value = answer.toString();

    answerBtn.addEventListener('click', handleSelectAnswer);
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
  for (let i = 0; i < state.questions.length; i++) {
    const question = state.questions[i];

    const pointElm = document.createElement('button');

    pointElm.classList.add('point', pointCls[question.status]);
    pointElm.innerText = `${i + 1}`;
    pointElm.dataset.value = i.toString();

    pointElm.addEventListener('click', handleSelectQuestion);
    fragment.append(pointElm);
  }

  pointsWrapper.replaceChildren(fragment);
}

// LOGIC FUNCTIONS
export function init() {
  const question = getNextQuestion();
  if (question) {
    renderQuiz(question);
    startTimer(); 
  }
  // startTimer()
}

let interval: number | undefined; // Intervalni global o‘zgaruvchi sifatida e'lon qilamiz

export function startTimer(){
  if (interval) clearInterval(interval); // Eski intervalni to‘xtatamiz

  timerElm.innerText = `${timeLeft}s`;
  interval = window.setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElm.innerText = `${timeLeft}s`;
    } else {
      clearInterval(interval); // Avval intervalni to‘xtatamiz
      interval = undefined; // Intervalni tozalaymiz
      timeLeft = 10;
      init(); // Yangi savol chiqaramiz
    }
  }, 1000);
}


window.addEventListener('load', init);
// window.addEventListener('load', startTimer);