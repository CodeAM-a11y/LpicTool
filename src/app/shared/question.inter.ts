import { AnswerInter } from './answer.inter';
import { ExamInter } from './exam.inter';

export interface QuestionInter {
  ExamId:number;
  Id:number;
  Type:string;
  QuestionText:string;
  Hint:string;
  Answers:AnswerInter[];
  Exam:ExamInter|null;
}
