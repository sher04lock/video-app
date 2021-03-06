import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { MovieService } from './movie.service';
import { IMovie } from './movie.interfaces';
import { mergeMap, catchError } from 'rxjs/operators';
import { LoadingService } from '../shared/loading.service';

@Injectable({ providedIn: 'root' })
export class MovieDetailsResolver implements Resolve<IMovie> {
    constructor(
        private movieService: MovieService,
        private router: Router,
        private loadingService: LoadingService,

    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IMovie | never> {
        const id = parseInt(route.paramMap.get('id'), 10);

        const onMovieNotFound = () => {
            this.loadingService.componentLoading.next(false);
            this.router.navigate(['/']);
            return EMPTY;
        };

        if (isNaN(id)) {
            return onMovieNotFound();
        }

        return this.movieService
            .getMovie(id)
            .pipe(
                mergeMap(movie => {
                    if (!movie) {
                        onMovieNotFound();
                    } else {
                        return of(movie);
                    }
                }),
                catchError(_ => onMovieNotFound()),
            );
    }
}
