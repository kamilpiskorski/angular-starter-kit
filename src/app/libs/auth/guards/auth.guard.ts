// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !!this.authService.authTokenValue ? true : this.router.parseUrl(`/auth/login?returnUrl=${state.url}`);
  }
}
