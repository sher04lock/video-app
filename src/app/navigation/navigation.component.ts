import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from '../shared/loading.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { IconProvider } from '../shared/icon-provider.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  username: string;

  private isLoadingSubscription: Subscription;

  isLoading: boolean;
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loadingService: LoadingService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
    public icons: IconProvider,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getUsername();
  }

  ngOnInit() {
    this.isLoadingSubscription = this.loadingService.isLoading$
      .subscribe(isLoading => {
        setTimeout(() => {
          this.isLoading = isLoading;
        }, 0);
      });

    this.authService.events.subscribe(event => {
      this.isLoggedIn = event === 'login';
      this.getUsername();
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

  protected getUsername() {
    const { username } = this.userService.getUserData();
    this.username = username;
  }
}
