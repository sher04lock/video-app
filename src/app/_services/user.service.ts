import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap, throttleTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const USER_KEY = 'video-app-user';

export interface ITimeUpdate {
  movie_id: number | string;
  currentTime: number;
}

export interface IMovieRating {
  user_id: string;
  movie_id: number;
  rating: number;
}

export enum IUserRole {
  standard = 'standard',
  admin = 'admin',
}

export interface IUser {
  _id: string;
  username: string;
  watchProgress: { [movie_id: string]: number };
  savedForLater: number[];
  role: IUserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = environment.apiUrl + '/users';

  constructor(private readonly httpClient: HttpClient) { }

  public listenForTimeUpdates(timeUpdates: Observable<ITimeUpdate>) {
    return timeUpdates.pipe(
      tap(timeUpdate => this.saveCurrentTimeLocally(timeUpdate)),
      throttleTime(5_000),
      mergeMap(timeUpdate => this.saveCurrentTimeRemotely(timeUpdate))
    );
  }

  public saveCurrentTimeLocally({ movie_id, currentTime }: ITimeUpdate) {
    localStorage.setItem(this.currentTimeKey(movie_id), currentTime.toString());
  }

  public getCurrentTime(movieId: number) {
    const lastSavedTime = localStorage.getItem(this.currentTimeKey(movieId));

    return parseFloat(lastSavedTime) || 0;
  }

  public saveUserData(user: IUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserData(): IUser {
    return JSON.parse(localStorage.getItem(USER_KEY)) || {};
  }

  public saveUserMoviesProgress(watchProgress: { [movie_id: string]: number } = {}) {
    for (const [movie_id, currentTime] of Object.entries(watchProgress)) {
      this.saveCurrentTimeLocally({ movie_id, currentTime });
    }
  }

  public setSavedForLater(params: { movie_id: number, savedForLater: boolean }) {
    const userId = this.getUserData()._id;

    if (!userId) {
      return of({});
    }

    return this.httpClient.post(`${this.URL}/${userId}/watch-later`, { ...params });
  }

  public cleanUserData() {
    localStorage.removeItem(USER_KEY);
  }

  protected saveCurrentTimeRemotely(timeUpdate: ITimeUpdate) {
    const userId = this.getUserData()._id;

    if (!userId) {
      return of({});
    }

    return this.httpClient.put(`${this.URL}/${userId}/watch-progress`, { ...timeUpdate });
  }

  protected currentTimeKey(movieId: string | number) {
    return `movie_id=${movieId}:progress`;
  }
}
