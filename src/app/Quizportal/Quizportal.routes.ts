import {Routes} from '@angular/router';
import {QuestionOverview} from './question-overview/question-overview';
import { ExerciseMode } from './exercise-mode/exercise-mode';
import { ListQuestions } from './list-questions/list-questions';

export const QuizportalRoutes: Routes = [
  {
    path:'Quizportal/Simulation',
    component:QuestionOverview,
    title:'Quizportal'
  },
  {
    path:'Quizportal/Exercise',
    component:ExerciseMode,
    title:'Exercise'
  },
  {
    path:'Quizportal/listQuestions',
    component:ListQuestions,
    title:'List Questions'
  }
]
