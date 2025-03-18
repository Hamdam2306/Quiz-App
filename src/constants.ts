import type { Status } from './types';

export const MAX_NUMBER = 50;
export const ANSWER_INTERVAL = 20;
export const MAX_QUESTION_COUNT = 10;

export const answerCls: Record<Exclude<Status, 'unanswered'>, string> = {
  correct: 'answer-correct',
  incorrect: 'answer-incorrect'
};

export const pointCls: Record<Status, string> = {
  correct: 'point-correct',
  incorrect: 'point-incorrect',
  unanswered: 'point-unanswered'
};
