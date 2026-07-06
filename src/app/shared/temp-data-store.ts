import { Service } from '@angular/core';
import {ChoosenExamInter} from './choosen-exam.inter';
import { GivenAnswerInter } from './given-answer.inter';

@Service()
export class TempDataStore {
  //Hier werden abgegebene Fragen abgespeichert
  givenAnwers: GivenAnswerInter[] = [];
  pushAnswers(GivenAnswer: GivenAnswerInter) {
    this.givenAnwers.push(GivenAnswer);
}

  #ChoosenExamInter: ChoosenExamInter = {
    examId: '2',
  };

  insertExamInter(ChoosenExamInter: ChoosenExamInter) {
    this.#ChoosenExamInter = ChoosenExamInter;
  }

  returnExamInter() {
    return this.#ChoosenExamInter;
  }
}
