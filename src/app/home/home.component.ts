import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { IMovie, ILastViewedMovie, ISavedMovie } from '../movie/movie.interfaces';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;

  mostViewedMovies: IMovie[];
  lastViewedMovies: ILastViewedMovie[];
  savedMovies: ISavedMovie[];

  constructor(
    private readonly movieService: MovieService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.movieService.getMostViewedMovies({ limit: 20 })
      .subscribe(movies => this.mostViewedMovies = movies);

    this.isLoggedIn = this.authService.isLoggedIn();

    if (!this.isLoggedIn) {
      return;
    }

    this.authService.events.subscribe(event => {
      this.isLoggedIn = event === 'login';
    });

    this.movieService.getLastViewedMovies()
      .subscribe(movies => this.lastViewedMovies = movies);

    this.movieService.getSavedMovies()
      .subscribe(movies => this.savedMovies = movies);
  }
}
