import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMovieRating } from '../_services/user.service';
import { IFoundMovie, ILastViewedMovie, IMovie, ISavedMovie } from './movie.interfaces';
import DataSource from 'devextreme/data/data_source';
import ODataStore from 'devextreme/data/odata/store';

@Injectable({
  providedIn: 'root'
})
export class MovieService<T = IMovie> {
  private readonly URL = environment.apiUrl + '/movies';

  private odataDataSource: DataSource;

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

  getLastViewedMovies() {
    return this.httpClient.get<ILastViewedMovie[]>(`${this.URL}/last-viewed`);
  }

  getSavedMovies() {
    return this.httpClient.get<ISavedMovie[]>(`${this.URL}/saved`);
  }

  search(term: string, { limit = 9, skip = 0 }: { limit?: number; skip?: number; } = {}) {
    const params = {
      q: term,
      limit: limit.toString(),
      skip: skip.toString(),
    };

    return this.httpClient.get<IFoundMovie[]>(`${this.URL}/search`, { params });
  }

  getODataSource() {
    const url = this.URL + '/odata';

    if (!this.odataDataSource) {
      this.odataDataSource = new DataSource({
        store: new ODataStore({ url, version: 4 }),
      });
    }

    return this.odataDataSource;
  }

  toggleMovieVisibility(movie_id: number, hidden: boolean) {
    return this.httpClient.post(`${this.URL}/${movie_id}/hidden`, { hidden });
  }

  protected currentTimeKey(movieId: string | number) {
    return `movie_id=${movieId}:progress`;
  }
}
