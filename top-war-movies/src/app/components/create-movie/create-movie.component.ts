import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { MovieValidationService } from '../../services/movie-validation.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [InputFieldComponent, TextareaFieldComponent, FormsModule, CommonModule],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {
  title: string = '';
  plot: string = '';
  releaseYear: string = '';
  director: string = '';
  writers: string = '';
  actors: string = '';
  length: string = '';
  warType: string = '';
  userRating: string = '';
  expertRating: string = '';
  language: string = '';
  country: string = '';
  imageUrl: string = '';
  trailerUrl: string = '';

  successMessage: string = '';
  errorMessage: string = '';
  errors: string[] = [];

  constructor(private movieService: MovieService, 
    private validationService: MovieValidationService, private router: Router) {}

  onSubmit() {
    this.errors = [];
    this.successMessage = '';
    this.errorMessage = '';
    
    const newMovie: any = {
    title: this.title,
    plot: this.plot,
    releaseYear: this.releaseYear,
    director: this.director,
    writers: this.writers,
    actors: this.actors,
    length: this.length,
    warType: this.warType,
    userRating: this.userRating,
    expertRating: this.expertRating,
    language: this.language,
    country: this.country,
    imageUrl: this.imageUrl,
    trailerUrl: this.trailerUrl
  };

  this.errors = this.validationService.validateMovie(newMovie);
  if (this.errors.length) {
    return;
  }

  if (this.writers) newMovie.writers = this.writers.split(',').map(s => s.trim());
  if (this.actors) newMovie.actors = this.actors.split(',').map(s => s.trim());
  if (this.language) newMovie.language = this.language.split(',').map(s => s.trim());
  if (this.country) newMovie.country = this.country.split(',').map(s => s.trim());
  if (this.releaseYear && !isNaN(Number(this.releaseYear))) newMovie.releaseYear = Number(this.releaseYear);

  const userRatingNum = this.userRating && !isNaN(Number(this.userRating)) ? Number(this.userRating) : undefined;
  const expertRatingNum = this.expertRating && !isNaN(Number(this.expertRating)) ? Number(this.expertRating) : undefined;
  if (userRatingNum !== undefined || expertRatingNum !== undefined) {
    newMovie.imdbRating = {};
    if (userRatingNum !== undefined) newMovie.imdbRating.userRating = userRatingNum;
    if (expertRatingNum !== undefined) newMovie.imdbRating.expertRating = expertRatingNum;
  }

  if (this.imageUrl || this.trailerUrl) {
    newMovie.media = {};
    if (this.imageUrl) newMovie.media.imageUrl = this.imageUrl;
    if (this.trailerUrl) newMovie.media.trailerUrl = this.trailerUrl;
  }

  Object.keys(newMovie).forEach(key => {
    if (newMovie[key] === '' || newMovie[key] === null) {
      delete newMovie[key];
    }
  });
  
    this.movieService.createMovie(newMovie).subscribe({
      next: (result) => {
        this.successMessage = 'Movie created!';
        this.errorMessage = '';
        this.title = '';
        this.plot = '';
        this.releaseYear = '';
        this.director = '';
        this.writers = '';
        this.actors = '';
        this.length = '';
        this.warType = '';
        this.userRating = '';
        this.expertRating = '';
        this.language = '';
        this.country = '';
        this.imageUrl = '';
        this.trailerUrl = '';
        this.router.navigate(['/']);
      },
      error: (err) => {
      this.successMessage = '';
      this.errorMessage = 'Something went wrong: ' + (err?.error?.message || err.message || err);
      }
    });
  }
}
