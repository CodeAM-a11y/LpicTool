import { inject, ResourceRef, Service } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import {QuestionInter} from './question.inter';
import { AnswerInter } from './answer.inter';

@Service()
export class DataStore {
  #http = inject(HttpClient);
  #apiUrl: string = 'http://localhost:5107';

  getAllQuestions(): ResourceRef<QuestionInter[]> {
    return httpResource<QuestionInter[]>(() => ({ url: `${this.#apiUrl}/api/question` }), {
      defaultValue: [],
    });
  }

  getQuestionByexamId(examid:()=>string):HttpResourceRef<QuestionInter[]>{
    return httpResource<QuestionInter[]>(()=>({url:`${this.#apiUrl}/api/question/${examid()}` }),{
      defaultValue:[],
    });
  }

  getAllAnswers(): ResourceRef<AnswerInter[]> {
    return httpResource<AnswerInter[]>(() => ({ url: `${this.#apiUrl}/api/answer` }), {
      defaultValue: [],
    });
  }

  getAnswersForQuestion(examid: () => string, questionId: () => string): HttpResourceRef<AnswerInter[]>{
    return httpResource<AnswerInter[]>(
      () => `${this.#apiUrl}/api/answer/${examid()}/${questionId()}`,{defaultValue:[]});
  };

  getSingleAnswer(
    examid: () => string,
    questionId: () => string,
    answerId: () => string,
  ): HttpResourceRef<AnswerInter | undefined> {
    return httpResource<AnswerInter>(
      () => `${this.#apiUrl}/api/answer/${examid()}/${questionId()}/${answerId()}`,
    );
  }
}
