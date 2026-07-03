import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import {QuizportalRoutes} from './Quizportal/Quizportal.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, title: 'Home' },
  ...QuizportalRoutes,
];
