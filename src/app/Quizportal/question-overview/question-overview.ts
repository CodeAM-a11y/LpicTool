import { Component, computed, inject, input, signal } from '@angular/core';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { DataStore } from '../../shared/data-store';
import { question } from '../question/question.component';
import { QuestionInter } from '../../shared/question.inter';
import { AnswerInter } from '../../shared/answer.inter';
import {TempDataStore} from '../../shared/temp-data-store';
import { ChoosenExamInter } from '../../shared/choosen-exam.inter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-overview',
  imports: [question],
  templateUrl: './question-overview.html',
  styleUrl: './question-overview.css',
})
export class QuestionOverview {
  #dataStore = inject(DataStore);
  #tempDataStore = inject(TempDataStore);
  readonly examId = this.#tempDataStore.returnExamInter();
  protected givenAnswers = signal<GivenAnswerInter[]>([]);
  protected questions = this.#dataStore.getQuestionByexamId(() => this.examId.examId);
  protected allAnswers = this.#dataStore.getAllAnswers();

  // questionsWithAnswers enthält jetzt eine zusätzliche uniqueId (string) kombiniert aus examId und id
  protected questionsWithAnswers = this.#dataStore.getQuestionsAnswers();
}
