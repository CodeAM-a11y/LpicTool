import { Component, computed, effect, inject, signal } from '@angular/core';
import { DataStore } from '../../shared/data-store';
import { TempDataStore } from '../../shared/temp-data-store';
import { ExerciseOptModelInterface } from '../../shared/exercise-opt-model.interface';
import { QuestionInter } from '../../shared/question.inter';
import { Functions,shuffleArray} from '../../shared/functions';
import { ExamFinish } from '../exam-finish/exam-finish';
import { question } from '../question/question.component';
import { ExerciseQuestion } from '../exercise-question/exercise-question';

@Component({
  selector: 'app-exercise-mode',
  imports: [ExamFinish, question, ExerciseQuestion],
  templateUrl: './exercise-mode.html',
  styleUrl: './exercise-mode.css',
})
export class ExerciseMode {
  #dataStore = inject(DataStore);
  #tempDataStore = inject(TempDataStore);
  protected readonly options = signal<ExerciseOptModelInterface>(
    this.#tempDataStore.exerciseOptions,
  );
  //Hol erstmal alle Fragen und Antworten nach gewählter examid
  protected questionsWithAnswers = this.#dataStore.getQuestionsAnswers(() => this.options().examId);

  protected filteredQuestions = computed(() => {
    let questions = this.questionsWithAnswers.value();
    if (this.options().questionsShuffled === true) {
      questions = shuffleArray(this.questionsWithAnswers.value());
    } else {
      questions = this.questionsWithAnswers.value();
    }

    if (this.options().howManyQuestions > 0) {
      questions = questions.slice(0, this.options().howManyQuestions);
    }
    return questions;
  });
  //zum navigieren der Fragen
  protected currentQuestionIndex = signal(0);
  protected inputQuestion = computed(() =>
    this.filteredQuestions().at(this.currentQuestionIndex()),
  );
  protected checkedAnswers = this.#tempDataStore.arrayCorrectOrNot;
  protected finishExam = signal<boolean>(false);

  //Nach beenden des Exams wird die Liste der Antworten gelöscht
  ngOnDestroy() {
    this.#tempDataStore.clearArrayCorrectOrNot();
  }
}
