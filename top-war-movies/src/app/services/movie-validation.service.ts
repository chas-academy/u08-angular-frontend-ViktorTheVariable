import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieValidationService {
  validateMovie(movie: any): string[] {
    const errors: string[] = [];

    if (!movie.title || !movie.title.trim()) {
      errors.push('Title is required.');
    } else if (movie.title.length > 100) {
      errors.push('Title cannot exceed 100 characters.');
    }

    if (movie.plot && movie.plot.length > 500) {
      errors.push('Plot cannot exceed 500 characters.');
    }

    if (movie.director && movie.director.length > 80) {
      errors.push('Director cannot exceed 80 characters.');
    }

    if (movie.length) {
      if (movie.length.length > 5) {
        errors.push('Movie Length cannot exceed 5 characters.');
      }
      if (!/^\d{1,2}h\d{1,2}m$/.test(movie.length)) {
        errors.push('Movie Length must be in format like "2h34m".');
      }
    }

    if (movie.releaseYear) {
      if (movie.releaseYear.length > 4) {
        errors.push('Release Year cannot exceed 4 characters.');
      }
      const year = Number(movie.releaseYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1888 || year > currentYear) {
        errors.push(`Release Year must be a number between 1888 and ${currentYear}.`);
      }
    }

    if (movie.warType && movie.warType.length > 50) {
      errors.push('War Type cannot exceed 50 characters.');
    }

    if (movie.imageUrl) {
      if (movie.imageUrl.length > 255) {
        errors.push('Image URL cannot exceed 255 characters.');
      }
      if (!/^https?:\/\/.+\..+/.test(movie.imageUrl)) {
        errors.push('Image URL must be a valid URL.');
      }
    }

    if (movie.trailerUrl) {
      if (movie.trailerUrl.length > 255) {
        errors.push('Trailer URL cannot exceed 255 characters.');
      }
      if (!/^https?:\/\/.+\..+/.test(movie.trailerUrl)) {
        errors.push('Trailer URL must be a valid URL.');
      }
    }

    if (movie.userRating) {
      if (movie.userRating.length > 4) {
        errors.push('User Rating cannot exceed 4 characters.');
      }
      const rating = Number(movie.userRating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        errors.push('User Rating must be a number between 0 and 10.');
      }
    }

    if (movie.expertRating) {
      if (movie.expertRating.length > 4) {
        errors.push('Expert Rating cannot exceed 4 characters.');
      }
      const rating = Number(movie.expertRating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        errors.push('Expert Rating must be a number between 0 and 10.');
      }
    }

    if (movie.writers && movie.writers.length > 255) {
      errors.push('Writers cannot exceed 255 characters.');
    }

    if (movie.actors && movie.actors.length > 255) {
      errors.push('Actors cannot exceed 255 characters.');
    }

    if (movie.language && movie.language.length > 500) {
      errors.push('Spoken Languages cannot exceed 500 characters.');
    }

    if (movie.country && movie.country.length > 255) {
      errors.push('Filming Locations cannot exceed 255 characters.');
    }

    return errors;
  }
}
