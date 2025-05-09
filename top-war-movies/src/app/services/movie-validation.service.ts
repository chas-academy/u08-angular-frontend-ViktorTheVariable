import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieValidationService {
  validateMovie(movie: any): string[] {
    const errors: string[] = [];

    // Title: required, max 100
    if (!movie.title || !movie.title.trim()) {
      errors.push('Title is required.');
    } else if (movie.title.length > 100) {
      errors.push('Title cannot exceed 100 characters.');
    }

    // Plot: optional, max 500
    if (movie.plot && movie.plot.length > 500) {
      errors.push('Plot cannot exceed 500 characters.');
    }

    // Director: optional, max 80
    if (movie.director && movie.director.length > 80) {
      errors.push('Director cannot exceed 80 characters.');
    }

    // Length: optional, max 5, must match format
    if (movie.length) {
      if (movie.length.length > 5) {
        errors.push('Movie Length cannot exceed 5 characters.');
      }
      if (!/^\d{1,2}h\d{1,2}m$/.test(movie.length)) {
        errors.push('Movie Length must be in format like "2h34m".');
      }
    }

    // Release Year: optional, max 4, must be number between 1888 and current year
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

    // War Type: optional, max 50
    if (movie.warType && movie.warType.length > 50) {
      errors.push('War Type cannot exceed 50 characters.');
    }

    // Image URL: optional, max 255, must be valid URL
    if (movie.imageUrl) {
      if (movie.imageUrl.length > 255) {
        errors.push('Image URL cannot exceed 255 characters.');
      }
      if (!/^https?:\/\/.+\..+/.test(movie.imageUrl)) {
        errors.push('Image URL must be a valid URL.');
      }
    }

    // Trailer URL: optional, max 255, must be valid URL
    if (movie.trailerUrl) {
      if (movie.trailerUrl.length > 255) {
        errors.push('Trailer URL cannot exceed 255 characters.');
      }
      if (!/^https?:\/\/.+\..+/.test(movie.trailerUrl)) {
        errors.push('Trailer URL must be a valid URL.');
      }
    }

    // User Rating: optional, max 4, must be number 0-10
    if (movie.userRating) {
      if (movie.userRating.length > 4) {
        errors.push('User Rating cannot exceed 4 characters.');
      }
      const rating = Number(movie.userRating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        errors.push('User Rating must be a number between 0 and 10.');
      }
    }

    // Expert Rating: optional, max 4, must be number 0-10
    if (movie.expertRating) {
      if (movie.expertRating.length > 4) {
        errors.push('Expert Rating cannot exceed 4 characters.');
      }
      const rating = Number(movie.expertRating);
      if (isNaN(rating) || rating < 0 || rating > 10) {
        errors.push('Expert Rating must be a number between 0 and 10.');
      }
    }

    // Writers: optional, max 255 (as string before split)
    if (movie.writers && movie.writers.length > 255) {
      errors.push('Writers cannot exceed 255 characters.');
    }

    // Actors: optional, max 255 (as string before split)
    if (movie.actors && movie.actors.length > 255) {
      errors.push('Actors cannot exceed 255 characters.');
    }

    // Language: optional, max 500 (as string before split)
    if (movie.language && movie.language.length > 500) {
      errors.push('Spoken Languages cannot exceed 500 characters.');
    }

    // Country: optional, max 255 (as string before split)
    if (movie.country && movie.country.length > 255) {
      errors.push('Filming Locations cannot exceed 255 characters.');
    }

    // Extra: Check that writers, actors, language, country are comma-separated if not empty
    ['writers', 'actors', 'language', 'country'].forEach(field => {
      if (movie[field] && typeof movie[field] === 'string' && movie[field].trim().length > 0) {
        // No special validation here, but you can add if you want to check for correct comma separation
      }
    });

    return errors;
  }
}
