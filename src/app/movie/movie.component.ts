import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, of } from 'rxjs';
import { catchError, map, throttleTime } from 'rxjs/operators';
import { IconProvider } from '../shared/icon-provider.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { IMovie, IFoundMovie } from './movie.interfaces';
import { MovieService } from './movie.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  video: IMovie;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;

  savedForLater = false;

  originalRating;
  state = {
    rating: false,
  };

  relatedMovies: IFoundMovie[];

  get player(): HTMLVideoElement {
    return this.videoPlayer.nativeElement;
  }

  constructor(
    public iconProvider: IconProvider,
    protected route: ActivatedRoute,
    protected movieService: MovieService,
    protected authService: AuthService,
    protected userService: UserService,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(({ movieDetails }: { movieDetails: IMovie }) => {
      this.video = movieDetails;
      this.originalRating = this.video.userRating;
      this.savedForLater = this.isSavedForLater(movieDetails);
    });

    this.player.currentTime = this.getCurrentTime();
    this.listenForTimeUpdates();

    this.getRelatedMovies();
  }

  getRelatedMovies() {
    this.movieService.search(this.video.title)
      .pipe(map(movies => movies.filter(m => m.movie_id !== this.video.movie_id)))
      .subscribe(movies => {
        this.relatedMovies = movies;
      });
  }

  listenForTimeUpdates() {
    const observable = fromEvent(this.player, 'timeupdate')
      .pipe(
        throttleTime(1_000),
        map(_ => ({ movie_id: this.video.movie_id, currentTime: this.player.currentTime }))
      );

    this.userService.listenForTimeUpdates(observable)
      .pipe(catchError(err => of({})))
      .subscribe();
  }

  onHover(hoveredRate: number) {
    this.video.userRating = hoveredRate;
  }

  onRateChange(rating: number) {
    this.video.userRating = rating;

    if (!this.authService.isLoggedIn()) {
      this.openSnackBar('Thanks for sharing your vote! If you want to persist it, please login (👉) first.', 'OK');
      return;
    }

    const { _id: user_id } = this.userService.getUserData();

    this.movieService
      .rateMovie({ user_id, movie_id: this.video.movie_id, rating })
      .subscribe();
    this.openSnackBar('Thanks for sharing your vote!', 'Dismiss');
    this.toggleRatingState();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  onRateReset(previousValue: number) {
    this.video.userRating = previousValue;
  }

  toggleRatingState() {
    this.state.rating = !this.state.rating;
  }

  getVideoUrl() {
    return this.movieService.getMovieUrl(this.video.movie_id);
  }

  getCurrentTime() {
    return this.userService.getCurrentTime(this.video.movie_id);
  }

  isSavedForLater(movie: IMovie) {
    return movie.user && movie.user.savedForLater && movie.user.savedForLater.includes(movie.movie_id);
  }

  saveForLater(savedForLater: boolean) {

    if (!this.authService.isLoggedIn()) {
      this.openSnackBar('Want to save it for later? Login first. 👉', 'OK');
      return;
    }

    this.userService
      .setSavedForLater({ movie_id: this.video.movie_id, savedForLater })
      .subscribe(_ => {
        // SetTimeout for nicer UX when clicking buttons
        setTimeout(() => {
          this.openSnackBar(savedForLater ? 'Movie saved for later' : 'Removed from saved', 'OK');
          this.savedForLater = savedForLater;
        }, 150);
      });
  }

  onMoviesFound(movies) {
    console.log(movies);
    // this.relatedMovies = movies;
  }
}
