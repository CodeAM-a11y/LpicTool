import { Component, computed, inject, input, signal } from '@angular/core';
import { QuestionInter } from '../../shared/question.inter';
import { DataStore } from '../../shared/data-store';
import { AnswerInter } from '../../shared/answer.inter';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { SIGNAL } from '@angular/core/primitives/signals';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import {TempDataStore} from '../../shared/temp-data-store';

@Component({
  selector: 'app-question',
  imports: [FormField, FormRoot],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class question {
  #dataStore = inject(DataStore);
  #tempDataStore=inject(TempDataStore);
  question = input.required<QuestionInter>();
  protected submittedResult: GivenAnswerInter | null = null;

  readonly #answerFI = signal<GivenAnswerInter>({
    examId: this.question[SIGNAL].value.examId,
    questionId: this.question[SIGNAL].value.id,
    answerText: '',
    ids: []
  });

  protected readonly answerForm = form(this.#answerFI, {
    submission: {
      action: async (field) => {
        this.submittedResult = field().value();

        const newGivenAnswer: GivenAnswerInter = {
          examId: field().value().examId,
          questionId: field().value().questionId,
          answerText: this.question[SIGNAL].value.type === 'fi' ? field().value().answerText : '',
          ids: this.question[SIGNAL].value.type !== 'fi' ? (field().value() as any).ids ?? [] : []
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
}
