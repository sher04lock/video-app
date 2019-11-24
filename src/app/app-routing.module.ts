import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailsResolver } from './movie/movie-details.resolver';
import { MovieListComponent } from './movie-list/movie-list.component';


const routes: Routes = [
  {
    path: '',
    component: MovieListComponent
  },
  {
    path: 'video/:id',
    component: MovieComponent,
    resolve: {
      movieDetails: MovieDetailsResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
