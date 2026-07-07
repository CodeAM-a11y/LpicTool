import { Component, effect, input } from '@angular/core';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { AnswerInter } from '../../shared/answer.inter';
import { QuestionInter } from '../../shared/question.inter';

@Component({
  selector: 'app-exam-finish',
  imports: [],
  templateUrl: './exam-finish.html',
  styleUrl: './exam-finish.css',
})
export class ExamFinish {
  givenAnswers=input.required<GivenAnswerInter[]>();
  corrextAnswers=input.required<QuestionInter[]>();
  checkedAnswers:boolean[]=[];

    /*Vergleicht GivenAnswerInter und QuestionInter miteinander und gibt tru zurück falls
    Antwort Ids alle true sind bei QuestionInter*/

  checkIng=
    function checkQuestionChoice(answer: GivenAnswerInter, question: QuestionInter): boolean {
    let correct = false;
    if(answer.answerText===''){
      for (const answerId of answer.ids) {
        if (question.answers.at(answerId)?.isCorrect) {
          correct = true;
        }
      }
      return correct;
    }
    else {
      for(const answer of question.answers){
        if(answer.answerText===answer.answerText){
          correct=true;}
        }
      }
    return correct;
    }
    constructor() {

      effect(() => {
        for (const answer of this.givenAnswers()) {
          for(const correctAns of this.corrextAnswers()){
            this.checkedAnswers.push(this.checkIng(answer, correctAns));
          }
        }
      });
    }

}
