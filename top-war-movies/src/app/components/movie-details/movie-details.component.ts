import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieDetails } from '../../models/movie-details.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe, RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  movie?: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe(data => {
        this.movie = data;
      });
    }
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get imageUrl(): string {
    if (!this.movie?.media?.imageUrl) return '';
    const baseUrl = 'http://localhost:3000';
    return this.movie.media.imageUrl.startsWith('http')
      ? this.movie.media.imageUrl
      : baseUrl + this.movie.media.imageUrl;
  }
  
}