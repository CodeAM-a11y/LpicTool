import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { QuestionInter } from '../../shared/question.inter';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import {TempDataStore} from '../../shared/temp-data-store';

@Component({
  selector: 'app-question',
  imports: [FormField, FormRoot],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class question {
  #tempDataStore = inject(TempDataStore);
  question = input.required<QuestionInter>();
  protected submittedResult = signal<GivenAnswerInter | null>(null);
  //Um zu prüfen ob Antwort bereits abgegeben wurde
  //Computed Funktion die automatisch ausgelöst wird wenn Antwort eingeben wird, ermittelt ob Antwort korrekt ist
  protected answerChecked = effect(() => {
    if (this.submittedResult() === null) {
      this.#tempDataStore.insertcorrectOrNot({
        questionId: this.question().id,
        correct: false,
      });
      return;
    }
    const result = this.submittedResult();
    if (!result) return;

    if (this.question().type === 'fi') {
      //sucht nach einem Element das der eingebenen Antwort entspricht
      if (this.question().answers.find((answer) => answer.answerText === this.submittedResult()?.answerText)) {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: true,
        });
      }
      else {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: false,
        });
      }
    } else if (this.question().type === 'sc') {
      if ((this.submittedResult()?.ids.length??0)>0===false){
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: false,
        });
      }
      else if (
        this.submittedResult()?.ids.every(
          (id) => this.question().answers.find((answer) => answer.id === id)?.isCorrect
        )
      ) {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: true,
        });
      }
      else {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: false,
        });
      }
    }
    //für 'mc'
    else {
      //array mit allen Ids der Antworten die true sind
      let correctIds = this.question()
        .answers.filter((answer) => answer.isCorrect)
        .map((answer) => answer.id);
      //Geht alle korrekten Ids durch und prüft, ob alle in den eingegebenen Ids vorkommen, ansonsten gibt every false zurück
      if (
        correctIds.every((id) => this.submittedResult()?.ids.includes(id)) &&
        this.submittedResult()?.ids.length === correctIds.length
      ) {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: true,
        });
      } else {
        this.#tempDataStore.insertcorrectOrNot({
          questionId: this.question().id,
          correct: false,
        });
      }
    }
  });

  protected readonly answerState = signal<GivenAnswerInter>({
    examId: 0,
    questionId: 0,
    answerText: '',
    ids: [],
  });

  constructor() {
    //Consturctor ist wichtig damit Question immer neu belegt wird für Signal form
    effect(() => {
      const q = this.question();
      this.answerState.set({
        examId: q.examId,
        questionId: q.id,
        answerText: '',
        ids: [],
      });

      // Reset des Status bei einem Fragenwechsel
      this.submittedResult.set(null);
    });
  }

  protected readonly answerForm = form(this.answerState, {
    submission: {
      action: async (field) => {
        const formValue = field().value();
        this.submittedResult.set(formValue);
        //Hier wird id und boolen gepsichert um in exam finish anzuzeigen welche Antworten korrekt oder falsch sind#
        const newGivenAnswer: GivenAnswerInter = {
          examId: formValue.examId,
          questionId: formValue.questionId,

          answerText: this.question().type === 'fi' ? formValue.answerText : '',
          ids: this.question().type !== 'fi' ? formValue.ids : [],
        };

        const foundAnswer = this.#tempDataStore.givenAnwers.find(
          (b) => b.questionId === newGivenAnswer.questionId && b.examId === newGivenAnswer.examId,
        );

        //Hier wird geprüft ob die Antwort bereits  abgegeben wurde eventuell wird die Antwort gelöscht damit eine neue gegeben werden kann
        if (!foundAnswer) {
          this.#tempDataStore.pushAnswers(newGivenAnswer);
        } else {
          const index = this.#tempDataStore.givenAnwers.indexOf(foundAnswer);
          if (index > -1) {
            this.#tempDataStore.givenAnwers.splice(index, 1);
          }
          this.#tempDataStore.pushAnswers(newGivenAnswer);
        }

        if (this.submittedResult() != null) return;
        return { kind: 'serverError', message: 'Failed to submit form' };
      },
    },
  });
  handleAnswer(answerId: number) {
    console.log('Eltern-Komponente hat die Antwort erhalten:', answerId);
  }
  //KI generiert
  protected updateSingleChoice(id: number) {
    this.answerState.update((s) => ({ ...s, ids: [id] }));
  }

  protected updateMultiChoice(id: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.answerState.update((s) => {
      const ids = checked ? [...s.ids.filter((i) => i !== id), id] : s.ids.filter((i) => i !== id);
      return { ...s, ids };
    });
  }
}
