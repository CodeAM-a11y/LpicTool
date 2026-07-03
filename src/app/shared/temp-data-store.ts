import { Service } from '@angular/core';
import {ChoosenExamInter} from './choosen-exam.inter';

@Service()
export class TempDataStore {
  #ChoosenExamInter: ChoosenExamInter= {
    examId:'2',
  };

  insertExamInter(ChoosenExamInter: ChoosenExamInter) {
    this.#ChoosenExamInter = ChoosenExamInter;
  }

  returnExamInter() {
    return this.#ChoosenExamInter;
  }

}
