import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCard } from '../../models/movie-card.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterModule],
  template: `
    <h2 class="main-title">Top War Movies</h2>
    <div>
      <a id="create-movie" class="button big-button" *ngIf="isAdmin" routerLink="/create-movie">Create Movie</a>
    <div *ngIf="isLoading">Loading Movies...</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <div class="main-container">
        <app-card 
          *ngFor="let movie of movies" 
          [data]="movie">
        </app-card>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies: MovieCard[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private movieService: MovieService, private authService: AuthService) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Could not load movies, please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
