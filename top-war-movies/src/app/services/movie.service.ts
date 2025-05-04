import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieCard } from '../models/movie-card.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MovieDetails } from '../models/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = '/api/v1/warmovies';
  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieCard[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(movies => movies.map(movie => ({
        _id: movie._id,
        title: movie.title,
        plot: movie.plot,
        imdbRating: {
          userRating: movie.imdbRating.userRating
        },
        media: {
          imageUrl: movie.media.imageUrl
        }
      })))
    );
  }  

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.apiUrl}/${id}`);
  }

}
