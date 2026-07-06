import { Component, input } from '@angular/core';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { AnswerInter } from '../../shared/answer.inter';

@Component({
  selector: 'app-exam-finish',
  imports: [],
  templateUrl: './exam-finish.html',
  styleUrl: './exam-finish.css',
})
export class ExamFinish {
  givenAnswers=input.required<GivenAnswerInter[]>();


}
