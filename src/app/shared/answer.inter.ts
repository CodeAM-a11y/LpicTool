import { QuestionInter } from './question.inter';

export interface AnswerInter {
  examId: number;
  questionId: number;
  id: number;
  answerText: string;
  isCorrect: boolean;
  question: QuestionInter | null;
}
