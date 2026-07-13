import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {ChoosenExamInter} from '../shared/choosen-exam.inter';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import {TempDataStore} from '../shared/temp-data-store';
import {ExerciseOptModelInterface} from '../shared/exercise-opt-model.interface';

@Component({
  selector: 'app-home-page',
  imports: [FormField, ReactiveFormsModule, FormRoot],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  #tempDataStore = inject(TempDataStore);
  protected choosenExamInter: ChoosenExamInter | null = null;
  protected choosenOptions: ExerciseOptModelInterface | null = null;
  #router = inject(Router);

  //Hier startet Signal Form zum Auswählen der Lpic Fragen.
  readonly #choosenExam = signal<ChoosenExamInter>({
    examId: '',
  });
  protected readonly examForm = form(this.#choosenExam, {
    submission: {
      action: async (field) => {
        //Speichert die im Signal ausgewählten Daten in der Variable ab
        this.choosenExamInter = field().value();
        //Sendet die Variable zum tempDatastore
        this.#tempDataStore.insertExamInter(this.choosenExamInter);
        //Nachdem auswählen der Lpic Prüfung wird man mit Submit zu den Fragen weiter geleitet.
        await this.#router.navigate(['/Quizportal/Simulation']);
        if (this.choosenExamInter != null) return;
        return { kind: 'serverError', message: 'Failed to submit form' };
      },
    },
  });

  //Die Form für die Liste mit Fragen
  protected readonly listForm = form(this.#choosenExam, {
    submission: {
      //Nach submission wird examid befüllt mit der ausgewählten Prüfung und zu listquestions geroutet
      action: async (field) => {
        //Speichert die im Signal ausgewählten Daten in der Variable ab
        this.choosenExamInter = field().value();
        //Sendet die Variable zum tempDatastore
        this.#tempDataStore.insertExamInter(this.choosenExamInter);
        //Nachdem auswählen der Lpic Prüfung wird man mit Submit zu den Fragen weiter geleitet.
        await this.#router.navigate(['/Quizportal/listQuestions']);
        if (this.choosenExamInter != null) return;
        return { kind: 'serverError', message: 'Failed to submit form' };
      },
    },
  });

  //Hier startet Code für Übungsmodus um die Optionen festzulegen.
  readonly #exerciseModel = signal<ExerciseOptModelInterface>({
    howManyQuestions: 0,
    questionsShuffled: false,
    answersShuffled: false,
    examId: '',
  });

  protected readonly exerciseForm = form(this.#exerciseModel, {
    submission: {
      action: async (field) => {
        //Speichert die im Form ausgewählten Daten in der Variable
        this.choosenOptions = field().value();
        //Sendet die Variable zum TempDatastore
        this.#tempDataStore.insertExerciseOpts(this.choosenOptions);
        //Übungsmodus routen
        await this.#router.navigate(['/Quizportal/Exercise']);
      },
    },
  });
}
