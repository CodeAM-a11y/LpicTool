import { AnswerInter } from './answer.inter';
import { ExamInter } from './exam.inter';

export interface QuestionInter {
  examId:number;
  id:number;
  type:string;
  questionText:string;
  hint:string;
  answers:AnswerInter[];
  exam:ExamInter|null;
}
