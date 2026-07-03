import { Component, computed, inject, input, signal } from '@angular/core';
import { QuestionInter } from '../../shared/question.inter';
import { DataStore } from '../../shared/data-store';
import { AnswerInter } from '../../shared/answer.inter';
import { GivenAnswerInter } from '../../shared/given-answer.inter';
import { SIGNAL } from '@angular/core/primitives/signals';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { async } from 'rxjs';

@Component({
  selector: 'app-question',
  imports: [FormField, FormRoot],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class question {
  //In diesem Block wird die Variable "answer" befüllt damit man es an die Antwort Komponenten weitergeben kann
  #dataStore = inject(DataStore);
  //Die Frage plus korrekte Antworten werden hier gespeichert
  question = input.required<QuestionInter>();
  //Die Antwort vom Form Signal wird derzeit hier abgespeichert
  protected submittedResult: GivenAnswerInter | null = null;

  //KI generierte Variable eventuell entfernen, nachdem REST API korrigiert wurde
  protected answers = computed<AnswerInter[]>(() => {
    const q = this.question();
    const arr = q?.answers ?? [];
    try {
      if (typeof window !== 'undefined') {
        const key = q ? `${q.examId}-${q.id}` : 'no-question';
        console.debug('[question] key=', key, 'answersCount=', arr.length, 'answers=', arr);
      }
    } catch (e) {}
    return arr;
  });
  //Ende

  //Hier startet Signal Form um Antworten abgeben zu können
  readonly #answerFI = signal<GivenAnswerInter>({
    examId: this.question[SIGNAL].value.examId,
    questionId: this.question[SIGNAL].value.id,
    answerText: '',
  });
  protected readonly answerForm = form(this.#answerFI, {
    submission: {
      action: async (field) => {
        this.submittedResult = field().value();
        if (this.submittedResult != null) return;
        return { kind: 'serverError', message: 'Failed to submit form' };
      },
    },
  });

  handleAnswer(answerId: number) {
    console.log('Eltern-Komponente hat die Antwort erhalten:', answerId);
    // Hier können Sie die Antwort speichern oder zur nächsten Frage springen
  }
}
