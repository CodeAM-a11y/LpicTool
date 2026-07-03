import { QuestionInter } from './question.inter';

export interface AnswerInter {
  // PascalCase (DB/EF mapping)
  ExamId?: number;
  QuestionId?: number;
  Id?: number;
  AnswerText?: string;
  IsCorrect?: boolean;
  Question?: QuestionInter | null;

  // camelCase (API JSON)
  examId?: number;
  questionId?: number;
  id?: number;
  answerText?: string;
  isCorrect?: boolean;
  question?: QuestionInter | null;
}
