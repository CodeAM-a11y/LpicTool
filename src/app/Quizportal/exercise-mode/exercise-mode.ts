import { Component, inject, signal } from '@angular/core';
import { DataStore } from '../../shared/data-store';
import { TempDataStore } from '../../shared/temp-data-store';
import { ExerciseOptModelInterface } from '../../shared/exercise-opt-model.interface';

@Component({
  selector: 'app-exercise-mode',
  imports: [],
  templateUrl: './exercise-mode.html',
  styleUrl: './exercise-mode.css',
})
export class ExerciseMode {
  #dataStore = inject(DataStore);
  #tempDataStore = inject(TempDataStore);
  protected readonly options = signal<ExerciseOptModelInterface>(
    this.#tempDataStore.exerciseOptions,
  );
  //Hol erstmal alle Fragen und Antworten nach gewählter examid
  protected questionsWithAnswers =
    this.#dataStore.getQuestionsAnswers(() => this.options().examId);

}
