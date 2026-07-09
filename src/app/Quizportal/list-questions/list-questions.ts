import { Component, inject, signal } from '@angular/core';
import { DataStore } from '../../shared/data-store';
import { TempDataStore } from '../../shared/temp-data-store';

@Component({
  selector: 'app-list-questions',
  imports: [],
  templateUrl: './list-questions.html',
  styleUrl: './list-questions.css',
})
export class ListQuestions {
  #dataStore = inject(DataStore);
  #tempDataStore = inject(TempDataStore);
  readonly examId = signal<string>(this.#tempDataStore.returnExamInter().examId);
  protected questionsWithAnswers = this.#dataStore.getQuestionsAnswers(() => this.examId());
}
