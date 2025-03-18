import { resetTimeLeft, timeLeft } from './index';
import { ANSWER_INTERVAL, MAX_NUMBER, MAX_QUESTION_COUNT } from './constants';
import { timerElm } from './elements';
import type { Operation, Question, State } from './types';


export const state: State = {
  questions: [],
  currentQuestionIdx: 0
};

export function generateNumber(maxNumber: number): number {
  const number = Math.floor(Math.random() * maxNumber);

  return number;
}

export function generateOperation() {
  const operations: Operation[] = ['*', '+', '-'];
  const randomIdx = generateNumber(3); //
  const operation = operations[randomIdx];

  return operation;
}

export function calculateAnswer(number1: number, number2: number, operation: Operation) {
  switch (operation) {
    case '+':
      return number1 + number2;
    case '-':
      return number1 - number2;
    case '*':
      return number1 * number2;
  }
}

export function generateAnswers(correctAnswer: number) {
  const answers = new Set([correctAnswer]);

  while (answers.size !== 4) {
    const randomAnswer = generateNumber(correctAnswer + ANSWER_INTERVAL); // ⏰
    answers.add(randomAnswer);
  }

  return Array.from(answers).sort(() => Math.random() - 0.5);
}

export function getNextQuestion() {
  if (state.questions.length === MAX_QUESTION_COUNT) return;

  const number1 = generateNumber(MAX_NUMBER); // 44
  const number2 = generateNumber(MAX_NUMBER); // 20
  const operation = generateOperation(); // "+"
  const correctAnswer = calculateAnswer(number1, number2, operation); // 64
  const answers = generateAnswers(correctAnswer); //
  const question: Question = {
    number1,
    number2,
    operation,
    correctAnswer,
    answers,
    selectedAnswer: null,
    status: 'unanswered',
    
  };

  state.questions.push(question);
  state.currentQuestionIdx = state.questions.length - 1;

  return question;
}

export function getCurrentQuestion() {
  const currentQuestion = state.questions[state.currentQuestionIdx];

  return currentQuestion;
}

export function checkAnswer(selectedAnswer: number) {
  const question = getCurrentQuestion();
  const isCorrect = selectedAnswer === question.correctAnswer;
  
  question.status = isCorrect ? 'correct' : 'incorrect';
  question.selectedAnswer = selectedAnswer;
  
  resetTimeLeft()
}



export function getOrder() {
  const order = state.currentQuestionIdx + 1;
  return order;
}



export function changeQuestion(questionIdx: number) {
  state.currentQuestionIdx = questionIdx;
}


