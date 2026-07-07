import { Service } from '@angular/core';
import {ChoosenExamInter} from './choosen-exam.inter';
import { GivenAnswerInter } from './given-answer.inter';
import { CorrectOrNotInter } from './correct-or-not.inter';

@Service()
export class TempDataStore {
  //Hier werden abgegebene Fragen abgespeichert
  givenAnwers: GivenAnswerInter[] = [];
  //Hier werden geprüfte Fragen abgespeichert
  arrayCorrectOrNot: CorrectOrNotInter[] = [];

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

  //correctOrNot in ein Array eintragen
  insertcorrectOrNot(correctOrNot: CorrectOrNotInter) {
    //Hier wird geprüft ob die Id bereits im Array vorhanden ist
    const foundId=this.arrayCorrectOrNot.findIndex((item)=>item.questionId === correctOrNot.questionId);
    if(foundId === -1){
      this.arrayCorrectOrNot.push(correctOrNot);
    }
    else {
      //falls bereits vorhanden wird das Array Element überschrieben
      this.arrayCorrectOrNot[foundId] = correctOrNot;
    }
  }

   clearArrayCorrectOrNot():void{
    this.arrayCorrectOrNot = [];
  }
}
