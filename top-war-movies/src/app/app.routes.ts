import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { AdminGuard } from './guards/admin.guard';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
            { path: 'create-movie', component: CreateMovieComponent, canActivate: [AdminGuard] },
            { path: 'update-movie/:id', component: UpdateMovieComponent, canActivate: [AdminGuard] },
            { path: 'login-register', component: LoginRegisterComponent}
        ]
    },
    { path: '**', redirectTo: '' }
];
