import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(status => {
      console.log('isLoggedIn:', status);
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.auth.logout();
  }
}
