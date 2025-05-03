import { Component, Input } from '@angular/core';
import { MovieCard } from '../../models/movie-card.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="card" [style.background-image]="getBackgroundImage()">
      <ng-container *ngIf="data; else missingData">
        <h3 class="card-title">{{ data.title }}</h3>
        <h4 class="card-plot-title">Plot</h4>
        <p class="card-plot">{{ data.plot }}</p>
        <p class="card-rating">User Rating: {{ data.imdbRating.userRating }}</p>
        <a [routerLink]="['/movie', data._id]" class="card-button button big-button">View Details &gt;</a>
      </ng-container>
      
      <ng-template #missingData>
        <p class="error">No movies found</p>
      </ng-template>
    </section>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() data!: MovieCard;

  constructor(private sanitizer: DomSanitizer) {}

  getBackgroundImage(): SafeStyle {
    if (!this.data?.media?.imageUrl) {
      return this.sanitizer.bypassSecurityTrustStyle('none');
    }

    const baseUrl = 'http://localhost:3000';

    const imageUrl = this.data.media.imageUrl.startsWith('http')
      ? this.data.media.imageUrl
      : baseUrl + this.data.media.imageUrl;

    return this.sanitizer.bypassSecurityTrustStyle(`url('${imageUrl}')`);
  }
}
