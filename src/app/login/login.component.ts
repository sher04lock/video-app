import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  state = {
    loginError: false,
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  login() {
    const username = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    this.loadingService.componentLoading.next(true);

    this.authService.login(username, password)
      .subscribe(
        response => {
          this.loadingService.componentLoading.next(false);
        },
        error => {
          this.loadingService.componentLoading.next(false);
          this.state.loginError = true;
        }
      );
  }

}
