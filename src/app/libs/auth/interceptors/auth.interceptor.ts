// Angular
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../services/auth.service';
// External
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authorizationHandler(request, next).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.message === 'Expired JWT Token') {
          return this.authService.refreshHandler(request, next);
        }

        if (error.status === 401) {
          this.authService.logout();

          return from(this.router.navigate(['/auth/login'])).pipe(
            switchMap(() => {
              return throwError(error);
            })
          );
        }

        return throwError(error);
      })
    );
  }
}
