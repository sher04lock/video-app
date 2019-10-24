import { Injectable, EventEmitter } from '@angular/core';
import { Router, RouteConfigLoadStart, NavigationStart, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { merge, Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingElements = 0;

  public isLoading$: Observable<boolean>;
  public componentLoading = new Subject<boolean>();

  constructor(
    private router: Router,

  ) {
    this.isLoading$ = merge(
      this.router.events,
      this.componentLoading // all components can ask for loading bar (e.g. when fetching data in ngOnInit)
    )
      .pipe(
        mergeMap(event => {
          switch (true) {
            case event instanceof RouteConfigLoadStart:
            case event instanceof NavigationStart:
            case event === true:
              this.loadingElements += 1;
              break;

            case event instanceof RouteConfigLoadEnd:
            case event instanceof NavigationEnd:
            case event === false:
              this.loadingElements -= 1;
              break;
          }
          return of(!!this.loadingElements);
        })
      );

  }
}
