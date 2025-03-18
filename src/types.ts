export type Operation = '+' | '-' | '*';
export type Status = 'correct' | 'incorrect' | 'unanswered';
export type Question = {
  number1: number;
  number2: number;
  operation: Operation;
  answers: Array<number>;
  correctAnswer: number;
  selectedAnswer: number | null;
  status: Status;

};

export interface State {
  currentQuestionIdx: number;
  questions: Question[];
}
