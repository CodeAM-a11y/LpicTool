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
  protected questions = this.#dataStore.getQuestionByexamId(()=>this.examId.examId);
  protected allAnswers = this.#dataStore.getAllAnswers();

  // questionsWithAnswers enthält jetzt eine zusätzliche uniqueId (string) kombiniert aus examId und id
  // Diese Variable wurde mit KI generiert, da Rest Api Answers und Questions separat zurückgibt.
  protected questionsWithAnswers = computed<(QuestionInter & { uniqueId: string })[]>(() => {
    const qs = this.questions.hasValue() ? this.questions.value() : [];
    const answers = this.allAnswers.hasValue() ? this.allAnswers.value() : [];
    const normalized = answers.map((rawAny) => {
      const raw = rawAny as any;
      const id = raw.id ?? raw.Id ?? null;
      const questionId = raw.questionId ?? raw.QuestionId ?? null;
      const examId = raw.examId ?? raw.ExamId ?? null;
      const answerText = (raw.answerText ?? raw.AnswerText ?? '') + '';
      const isCorrect = raw.isCorrect ?? raw.IsCorrect ?? false;
      const item: any = {
        // canonical camelCase
        id,
        questionId,
        examId,
        answerText,
        isCorrect,
        question: null,
        // PascalCase copies for existing templates if any
        Id: id,
        QuestionId: questionId,
        ExamId: examId,
        AnswerText: answerText,
        IsCorrect: isCorrect,
      };
      return item as AnswerInter;
    });

    const map = new Map<string, AnswerInter[]>();
    normalized.forEach((a) => {
      const qId = Number((a as any).questionId ?? (a as any).QuestionId ?? (a as any).questionId);
      const examId = Number((a as any).examId ?? (a as any).ExamId ?? (a as any).examId);
      const key = `${examId}-${qId}`;
      const arr = map.get(key) ?? [];
      arr.push(a);
      map.set(key, arr);
    });

    return qs.map((q) => {
      const key = `${q.examId}-${q.id}`;
      return { ...q, answers: map.get(key) ?? [], uniqueId: key } as QuestionInter & {
        uniqueId: string;
      };
    });
  });
}
