// Angular
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// Services
import { AuthService } from '../services/auth.service';
// External
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error.message === 'Expired JWT Token') {
        return this.authService.refreshHandler(request, next);
      }

      return throwError(error.error.message || error.statusText);
    }));
  }
}
