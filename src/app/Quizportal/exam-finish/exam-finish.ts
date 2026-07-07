import { Component, effect, inject, input } from '@angular/core';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { AnswerInter } from '../../shared/answer.inter';
import { QuestionInter } from '../../shared/question.inter';
import { CorrectOrNotInter } from '../../shared/correct-or-not.inter';
import {TempDataStore} from '../../shared/temp-data-store';

@Component({
  selector: 'app-exam-finish',
  imports: [],
  templateUrl: './exam-finish.html',
  styleUrl: './exam-finish.css',
})
export class ExamFinish {
  checkedAnswers=input.required<CorrectOrNotInter[]>();
  #tempDataStore=inject(TempDataStore);

   finishExam() {
     this.#tempDataStore.clearArrayCorrectOrNot();
  }
}
