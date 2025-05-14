import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
        <main id="main" class="main">
            <router-outlet></router-outlet>
        </main>
    <app-footer></app-footer>
  `
  ,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}