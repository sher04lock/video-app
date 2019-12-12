import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { IUser, UserService, IUserRole } from './user.service';
import { Subject } from 'rxjs';

interface ILoginResponse {
  access_token: string;
  user: IUser;
}

export type AuthEvent = 'login' | 'logout';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.apiUrl + '/auth';

  public events = new Subject<AuthEvent>();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService,
  ) { }

  public login(username: string, password: string) {
    return this.httpClient
      .post<ILoginResponse>(this.URL + '/login', { username, password })
      .pipe(
        tap(response => {
          this.saveLocally(response);
          this.events.next('login');
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
    this.userService.cleanUserData();
    this.events.next('logout');
  }

  public saveLocally({ access_token, user }: ILoginResponse) {
    this.saveToken(access_token);
    this.userService.saveUserMoviesProgress(user.watchProgress);
    this.userService.saveUserData(user);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserId() {
    const { _id } = this.userService.getUserData();
    return _id;
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

  public isAdmin() {
    const { role } = this.userService.getUserData();

    return role === IUserRole.admin;
  }

  protected saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
