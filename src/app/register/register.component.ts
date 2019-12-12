import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { LoadingService } from '../shared/loading.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private readonly userService: UserService,
    private readonly loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  register() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    this.loadingService.componentLoading.next(true);

    this.userService.register({ username: email, password })
      .subscribe(
        _ => {
          this.loadingService.componentLoading.next(false);
          this.openSnackBar('You\'re now part of Movicco, welcome! Now login you can...', 'OK!');
          this.router.navigate(['/login']);
        },
        err => {
          this.loadingService.componentLoading.next(false);
          const message = err.error && err.error.message;
          if (typeof message === 'string') {
            this.openSnackBar(message, 'Ok');
          } else {
            this.openSnackBar('Uh oh, something went wrong. Please check your input and give it another try.', 'Sure');
          }
        });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 7000,
      verticalPosition: 'top',
    });
  }
}
