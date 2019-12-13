import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingService } from '../shared/loading.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly loadingService: LoadingService,
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
            return true;
        }

        this.loadingService.componentLoading.next(false);
        this.router.navigate(['']);
        return false;
    }
}
