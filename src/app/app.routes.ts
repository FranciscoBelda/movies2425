import { Routes } from '@angular/router';
import {MovieListComponent} from "./components/movie-list/movie-list.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: 'full'
  },
  {
    path: 'movie-list',
    component: MovieListComponent
  }
];
