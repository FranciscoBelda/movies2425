import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseURL = 'http://localhost:3000/api/movies/';
  constructor() { }

  getMovieList(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseURL);
  }

  getOneMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(this.baseURL+'movie/'+id);
  }

  addMovie(movie: Movie): Observable<StatusMessage>{
    return this.http.post<StatusMessage>(this.baseURL,movie);
  }

  updateMovie(movie: Movie): Observable<StatusMessageUpdate>{
    return this.http.put<StatusMessageUpdate>(this.baseURL+movie._id, movie);
  }

  deleteMovie(id: string): Observable<StatusMessage>{
    return this.http.delete<StatusMessage>(this.baseURL+id);
  }

  getGenres(): Observable<string[]>{
    return this.http.get<string[]>(this.baseURL+'getGenres');
  }
}

export interface StatusMessage{
  status: string;
}

export interface StatusMessageUpdate{
  status: string;
  data: Movie
}
