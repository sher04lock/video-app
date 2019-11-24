import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: any[] = [];
  constructor(private readonly movieService: MovieService) { }

  ngOnInit() {
    this.getMostViewedMovies({limit: 10}).subscribe(movies => { this.movies = movies; console.log("movies",this.movies[0]); });
  }

  getMostViewedMovies({limit, skip}: {limit?: number, skip?: number} = {}) {
    return this.movieService.getMostViewedMovies();
  }
}
