import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/movie";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  getMovieList(): Observable<Movie[]>{
    return this.http.get<Movie[]>(environment.apiUrl);
  }

  getOneMovie(id: string): Observable<Movie>{
    return this.http.get<Movie>(environment.apiUrl+'movie/'+id);
  }

  addMovie(movie: Movie): Observable<StatusMessage>{
    return this.http.post<StatusMessage>(environment.apiUrl,movie);
  }

  updateMovie(movie: Movie): Observable<StatusMessageUpdate>{
    return this.http.put<StatusMessageUpdate>(environment.apiUrl+movie._id, movie);
  }

  deleteMovie(id: string): Observable<StatusMessage>{
    return this.http.delete<StatusMessage>(environment.apiUrl+id);
  }

  getGenres(): Observable<string[]>{
    return this.http.get<string[]>(environment.apiUrl+'getGenres');
  }
}

// Añadimos las interfaces de respuesta de la API
export interface StatusMessage{
  status: string;
}

export interface StatusMessageUpdate{
  status: string;
  data: Movie
}
