import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from './movie.interfaces';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, throttleTime, mergeMap, debounceTime } from 'rxjs/operators';
import { ITimeUpdate, IMovieRating } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService<T = IMovie> {
  private readonly URL = environment.apiUrl + '/movies';

  constructor(private readonly httpClient: HttpClient) { }

  public getMovie(id: number | string) {
    return this.httpClient.get<T>(`${this.URL}/${id}`);
  }

  public getMovieUrl(id: number | string) {
    return `${this.URL}/${id}/stream`;
  }

  public getMostViewedMovies({ limit = 20, skip = 0 }: { limit?: number; skip?: number; } = {}) {
    const params = {
      limit: limit.toString(),
      skip: skip.toString(),
    };

    return this.httpClient.get<any[]>(`${this.URL}`, { params });
  }

  public rateMovie(rating: IMovieRating) {
    const userId = rating.user_id;

    if (!userId) {
      return of({});
    }

    return this.httpClient.put(`${this.URL}/${rating.movie_id}/rating`, { ...rating });
  }

  protected currentTimeKey(movieId: string | number) {
    return `movie_id=${movieId}:progress`;
  }
}
