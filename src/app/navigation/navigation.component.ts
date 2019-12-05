import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from '../shared/loading.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { IconProvider } from '../shared/icon-provider.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private isLoadingSubscription: Subscription;

  isLoading: boolean;
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
    public icons: IconProvider,
  ) {
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
    this.isLoadingSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged out.', 'Ok', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
