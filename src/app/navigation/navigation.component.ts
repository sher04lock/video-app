import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from '../shared/loading.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;
  private isLoadingSubscription: Subscription;

  isLoading: boolean;
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private readonly router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.isLoadingSubscription = this.loadingService.isLoading$
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });

    this.authService.events.subscribe(event => {
      this.isLoggedIn = event === 'login';
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.isLoadingSubscription.unsubscribe();
  }

  logout() {
    console.log('loggin outh')
    this.authService.logout();
  }
}
