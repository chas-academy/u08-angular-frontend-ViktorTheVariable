import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
            { path: 'login-register', component: LoginRegisterComponent}
        ]
    },
    { path: '**', redirectTo: '' }
];
