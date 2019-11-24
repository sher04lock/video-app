import { OnInit, Input, ViewChild, ElementRef, Component } from '@angular/core';
import { IconProvider } from '../shared/icon-provider.service';
import { IMovie } from './movie.interfaces';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './movie.service';
import { fromEvent, of } from 'rxjs';
import { throttleTime, tap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  video: IMovie;

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;


  originalRating;
  state = {
    rating: false,
  };

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
      this.originalRating = this.video.rating;
    });

    this.player.currentTime = this.getCurrentTime();
    this.listenForTimeUpdates();
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
    this.video.rating = hoveredRate;
  }

  onRateChange(rating: number) {
    this.video.rating = rating;

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
    this.video.rating = previousValue;
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
}
