import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router
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

  get imageUrl(): string | undefined {
  const url = this.movie?.media?.imageUrl;
  if (!url || url === 'Not specified') return undefined;
  const baseUrl = 'http://localhost:3000';
  return url.startsWith('http') ? url : baseUrl + url;
}

get trailerUrl(): string | undefined {
  const url = this.movie?.media?.trailerUrl;
  if (!url || url === 'Not specified') return undefined;
  return url;
}

   onDelete() {
  if (!this.movie?._id) return;
  if (confirm('Are you sure you want to delete this movie?')) {
    this.movieService.deleteMovie(this.movie._id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Could not delete movie: ' + (err?.error?.message || err.message || err));
      }
    });
  }
}

}