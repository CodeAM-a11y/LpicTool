import { Component, inject, input, Output, output, signal } from '@angular/core';
import { TempDataStore } from '../../shared/temp-data-store';
import { QuestionInter } from '../../shared/question.inter';

@Component({
  selector: 'app-list-quest-component',
  imports: [],
  templateUrl: './list-quest-component.html',
  styleUrl: './list-quest-component.css',
})
export class ListQuestComponent {
  #tempDataStore = inject(TempDataStore);
  question = input.required<QuestionInter>();
  buttonShow=signal<boolean>(false);
}
