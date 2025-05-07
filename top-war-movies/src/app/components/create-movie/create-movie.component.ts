import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [InputFieldComponent, TextareaFieldComponent, FormsModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {
  // Formfields
  title: string = '';
  plot: string = '';
  releaseYear?: number;
  director: string = '';
  writers: string = '';
  actors: string = '';
  length: string = '';
  warType: string = '';
  userRating?: number;
  expertRating?: number;
  language: string = '';
  country: string = '';
  imageUrl: string = '';
  trailerUrl: string = '';

  // Feedback for user.
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  onSubmit() {
    // Create new movie-object. If fields are empty, they will not be sent.
    const newMovie: any = {
      title: this.title
    };

    if (this.plot) newMovie.plot = this.plot;
    if (this.releaseYear) newMovie.releaseYear = this.releaseYear;
    if (this.director) newMovie.director = this.director;
    if (this.writers) newMovie.writers = this.writers.split(',').map(s => s.trim());
    if (this.actors) newMovie.actors = this.actors.split(',').map(s => s.trim());
    if (this.length) newMovie.length = this.length;
    if (this.warType) newMovie.warType = this.warType;
    if (this.userRating || this.expertRating) {
      newMovie.imdbRating = {};
      if (this.userRating) newMovie.imdbRating.userRating = this.userRating;
      if (this.expertRating) newMovie.imdbRating.expertRating = this.expertRating;
    }
    if (this.language) newMovie.language = this.language.split(',').map(s => s.trim());
    if (this.country) newMovie.country = this.country.split(',').map(s => s.trim());
    if (this.imageUrl || this.trailerUrl) {
      newMovie.media = {};
      if (this.imageUrl) newMovie.media.imageUrl = this.imageUrl;
      if (this.trailerUrl) newMovie.media.trailerUrl = this.trailerUrl;
    }

    this.movieService.createMovie(newMovie).subscribe({
      next: (result) => {
        this.successMessage = 'Movie created!';
        this.errorMessage = '';
        // Restore form if you want.
        this.title = '';
        this.plot = '';
        this.releaseYear = undefined;
        this.director = '';
        this.writers = '';
        this.actors = '';
        this.length = '';
        this.warType = '';
        this.userRating = undefined;
        this.expertRating = undefined;
        this.language = '';
        this.country = '';
        this.imageUrl = '';
        this.trailerUrl = '';
      },
      error: (err) => {
        this.successMessage = 'Movie created successfully.';
        this.errorMessage = 'Something went wrong: ' + (err?.error?.message || err.message || err);
      }
    });
  }
}
