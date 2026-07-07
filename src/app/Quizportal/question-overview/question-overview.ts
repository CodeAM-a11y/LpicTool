import { Component, computed, inject, signal } from '@angular/core';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { DataStore } from '../../shared/data-store';
import { question } from '../question/question.component';
import { TempDataStore } from '../../shared/temp-data-store';
import { ExamFinish } from '../exam-finish/exam-finish';

@Component({
  selector: 'app-question-overview',
  imports: [question, ExamFinish],
  templateUrl: './question-overview.html',
  styleUrl: './question-overview.css',
})
export class QuestionOverview {
  #dataStore = inject(DataStore);
  #tempDataStore = inject(TempDataStore);
  readonly examId = signal<string>(this.#tempDataStore.returnExamInter().examId);
  //abgegebene Antworten zum Anzeigen
  protected givenAnswers = signal<GivenAnswerInter[]>(this.#tempDataStore.givenAnwers);

  protected questionsWithAnswers = this.#dataStore.getQuestionsAnswers(() => this.examId());

  protected currentQuestionIndex = signal(0);
  protected inputQuestion = computed(() =>
    this.questionsWithAnswers.value().at(this.currentQuestionIndex()),
  );
  protected checkedAnswers=this.#tempDataStore.arrayCorrectOrNot;
}
