import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieCard } from '../models/movie-card.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MovieDetails } from '../models/movie-details.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // Sets the base URL for all movie-related API requests in one place.
  private apiUrl = environment.apiUrl + environment.apiVersion + '/warmovies';
  constructor(private http: HttpClient) { }

  // Used to display a list of movies on the homepage.
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

  createMovie(movie: Partial<MovieDetails>): Observable<MovieDetails> {
    return this.http.post<MovieDetails>(this.apiUrl, movie);
  }

  updateMovie(id: string, movie: Partial<MovieDetails>): Observable<MovieDetails> {
    return this.http.put<MovieDetails>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
