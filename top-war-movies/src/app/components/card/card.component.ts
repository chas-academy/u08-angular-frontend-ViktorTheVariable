import { Component, Input } from '@angular/core';
import { MovieCard } from '../../models/movie-card.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="card" [style.background-image]="getBackgroundImage()">
      <ng-container *ngIf="data; else missingData">
        <h3>{{ data.title }}</h3>
        <p>{{ data.plot }}</p>
        <p>User Rating: {{ data.imdbRating.userRating }}</p>
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

    const baseUrl = 'https://topwarmovies.onrender.com';

    const imageUrl = this.data.media.imageUrl.startsWith('http')
      ? this.data.media.imageUrl
      : baseUrl + this.data.media.imageUrl;

    return this.sanitizer.bypassSecurityTrustStyle(`url('${imageUrl}')`);
  }
}
