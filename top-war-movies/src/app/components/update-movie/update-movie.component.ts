import { Component, OnInit } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { TextareaFieldComponent } from '../textarea-field/textarea-field.component';
import { MovieValidationService } from '../../services/movie-validation.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [InputFieldComponent, TextareaFieldComponent, FormsModule, CommonModule],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss'
})
export class UpdateMovieComponent implements OnInit {
  id: string = '';
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

  constructor(
    private movieService: MovieService,
    private validationService: MovieValidationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private emptyIfNotSpecified(value: any): string {
  return value === 'Not specified' ? '' : value || '';
}

  private emptyIfZeroOrNotSpecified(value: any): string {
    return value === 0 || value === 'Not specified' ? '' : value?.toString() || '';
  }

  ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id') || '';
  this.movieService.getMovieDetails(this.id).subscribe({
    next: (movie: any) => {
      this.title = this.emptyIfNotSpecified(movie.title);
      this.plot = this.emptyIfNotSpecified(movie.plot);
      this.releaseYear = this.emptyIfZeroOrNotSpecified(movie.releaseYear);
      this.director = this.emptyIfNotSpecified(movie.director);
      this.writers = Array.isArray(movie.writers)
        ? movie.writers.map(this.emptyIfNotSpecified).join(', ')
        : this.emptyIfNotSpecified(movie.writers);
      this.actors = Array.isArray(movie.actors)
        ? movie.actors.map(this.emptyIfNotSpecified).join(', ')
        : this.emptyIfNotSpecified(movie.actors);
      this.length = this.emptyIfNotSpecified(movie.length);
      this.warType = this.emptyIfNotSpecified(movie.warType);
      this.userRating = this.emptyIfNotSpecified(movie.imdbRating?.userRating);
      this.expertRating = this.emptyIfNotSpecified(movie.imdbRating?.expertRating);
      this.language = Array.isArray(movie.language)
        ? movie.language.map(this.emptyIfNotSpecified).join(', ')
        : this.emptyIfNotSpecified(movie.language);
      this.country = Array.isArray(movie.country)
        ? movie.country.map(this.emptyIfNotSpecified).join(', ')
        : this.emptyIfNotSpecified(movie.country);
      this.imageUrl = this.emptyIfNotSpecified(movie.media?.imageUrl);
      this.trailerUrl = this.emptyIfNotSpecified(movie.media?.trailerUrl);
    },
      error: (err) => {
        this.errorMessage = 'Could not load movie: ' + (err?.error?.message || err.message || err);
      }
    });
  }

  onSubmit() {
    this.errors = [];
    this.successMessage = '';
    this.errorMessage = '';

    const updatedMovie: any = {
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

    this.errors = this.validationService.validateMovie(updatedMovie);
    if (this.errors.length) {
      return;
    }

    // Samma konverteringar som i create-movie
    if (this.writers) updatedMovie.writers = this.writers.split(',').map((s: string) => s.trim());
    if (this.actors) updatedMovie.actors = this.actors.split(',').map((s: string) => s.trim());
    if (this.language) updatedMovie.language = this.language.split(',').map((s: string) => s.trim());
    if (this.country) updatedMovie.country = this.country.split(',').map((s: string) => s.trim());
    if (this.releaseYear && !isNaN(Number(this.releaseYear))) updatedMovie.releaseYear = Number(this.releaseYear);

    const userRatingNum = this.userRating && !isNaN(Number(this.userRating)) ? Number(this.userRating) : undefined;
    const expertRatingNum = this.expertRating && !isNaN(Number(this.expertRating)) ? Number(this.expertRating) : undefined;
    if (userRatingNum !== undefined || expertRatingNum !== undefined) {
      updatedMovie.imdbRating = {};
      if (userRatingNum !== undefined) updatedMovie.imdbRating.userRating = userRatingNum;
      if (expertRatingNum !== undefined) updatedMovie.imdbRating.expertRating = expertRatingNum;
    }

    if (this.imageUrl || this.trailerUrl) {
      updatedMovie.media = {};
      if (this.imageUrl) updatedMovie.media.imageUrl = this.imageUrl;
      if (this.trailerUrl) updatedMovie.media.trailerUrl = this.trailerUrl;
    }

    Object.keys(updatedMovie).forEach(key => {
      if (updatedMovie[key] === '' || updatedMovie[key] === null) {
        delete updatedMovie[key];
      }
    });

    this.movieService.updateMovie(this.id, updatedMovie).subscribe({
      next: () => {
        this.successMessage = 'Movie updated!';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Something went wrong: ' + (err?.error?.message || err.message || err);
      }
    });
  }
}
