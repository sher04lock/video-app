import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie/movie.service';
import { MatSnackBar } from '@angular/material';
import { IMovie } from '../movie/movie.interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dataSource;

  constructor(
    private readonly movieService: MovieService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dataSource = this.movieService.getODataSource();
  }

  changeMovieVisibility(movieData: IMovie) {
    const { movie_id, hidden } = movieData;

    const changeTo = !hidden;

    this.movieService.toggleMovieVisibility(movie_id, changeTo).subscribe(_ => {
      movieData.hidden = changeTo;

      const takenActionMsg = changeTo ? 'Movie hidden' : 'Movie published';
      this.snackBar.open(takenActionMsg, 'Ok', {
        duration: 5000,
        verticalPosition: 'top',
      });
    });
  }

}
