import { QuestionInter } from './question.inter';

export interface AnswerInter {
  ExamId:number;
  QuestionId:number;
  Id:number;
  AnswerText:string;
  IsCorrect:boolean;
  Question:QuestionInter|null;
}
