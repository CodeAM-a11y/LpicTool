import { QuestionInter } from './question.inter';

export interface ExamInter {
  Id:number;
  Name:string;
  Questions:QuestionInter[];
}
