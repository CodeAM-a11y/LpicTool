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
  protected submittedResult: GivenAnswerInter | null = null;

  protected readonly answerState = signal<GivenAnswerInter>({
    examId: 0,
    questionId: 0,
    answerText: '',
    ids: [],
  });

  constructor() {
    /**
     * 2. Synchronisierung via Effect
     * Sobald sich 'question()' ändert, wird dieser Block ausgeführt.
     * Das stellt sicher, dass das Formular immer die IDs der aktuellen Frage hat.
     */
    effect(() => {
      const q = this.question();
      this.answerState.set({
        examId: q.examId,
        questionId: q.id,
        answerText: '',
        ids: [],
      });

      // Reset des Status bei einem Fragenwechsel
      this.submittedResult = null;
    });
  }

  protected readonly answerForm = form(this.answerState, {
    submission: {
      action: async (field) => {
        const formValue = field().value();
        this.submittedResult = formValue;

        const newGivenAnswer: GivenAnswerInter = {
          examId: formValue.examId,
          questionId: formValue.questionId,
          // 3. Sauberer Zugriff auf den Typ via this.question()
          answerText: this.question().type === 'fi' ? formValue.answerText : '',
          ids: this.question().type !== 'fi' ? formValue.ids : [],
        };

        this.#tempDataStore.pushAnswers(newGivenAnswer);

        if (this.submittedResult != null) return;
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
      const ids = checked
        ? [...s.ids.filter((i) => i !== id), id]
        : s.ids.filter((i) => i !== id);
      return { ...s, ids };
    });
  }
}
