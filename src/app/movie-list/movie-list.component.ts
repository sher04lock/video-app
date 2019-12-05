import { Component, OnInit, Input } from '@angular/core';
import { ISavedMovie, ILastViewedMovie, IMovie } from '../movie/movie.interfaces';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input()
  movies: IMovie | ISavedMovie | ILastViewedMovie;

  @Input() showVertically = false;

  constructor() { }

  ngOnInit() { }
}
