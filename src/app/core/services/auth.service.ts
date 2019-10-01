// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
// Config
import { environment } from '@env/environment';
// Models
import { JwtResponse } from '@app/data/models';
// External
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, first, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public authToken: Observable<string>;
  public authRefreshToken: Observable<string>;

  private authTokenSubject: BehaviorSubject<string>;
  private authRefreshTokenSubject: BehaviorSubject<string>;

  public refreshingAuthToken: boolean;

  constructor(private httpClient: HttpClient) {
    this.authTokenSubject = new BehaviorSubject(localStorage.getItem('authToken'));
    this.authToken = this.authTokenSubject.asObservable();

    this.authRefreshTokenSubject = new BehaviorSubject(localStorage.getItem('authRefreshToken'));
    this.authRefreshToken = this.authRefreshTokenSubject.asObservable();
  }

  public get authTokenValue() {
    return this.authTokenSubject.value;
  }

  public get authRefreshTokenValue() {
    return this.authRefreshTokenSubject.value;
  }

  private setToken(jwtResponse: JwtResponse) {
    localStorage.setItem('authToken', jwtResponse.token);
    localStorage.setItem('authRefreshToken', jwtResponse.refresh_token);

    this.authTokenSubject.next(jwtResponse.token);
    this.authRefreshTokenSubject.next(jwtResponse.refresh_token);
  }

  private removeToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');

    this.authTokenSubject.next(null);
    this.authRefreshTokenSubject.next(null);
  }

  private getAuthorizationRequest(request: HttpRequest<any>) {
    const authToken = this.authTokenValue;

    if (authToken && !request.url.match('jwt')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return request;
  }

  public authorizationHandler(request: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshingAuthToken && !request.url.match('jwt')) {
      return this.refreshHandler(request, next);
    }

    return next.handle(this.getAuthorizationRequest(request));
  }

  public refreshHandler(request: HttpRequest<any>, next: HttpHandler) {
    const authRefreshToken: Observable<any> = this.refresh();

    return authRefreshToken.pipe(switchMap(() => {
      return next.handle(this.getAuthorizationRequest(request));
    }));
  }

  public login(username: string, password: string) {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}/token`, { username, password }).pipe(
      first(),
      tap(response => {
        this.setToken(response);
      })
    );
  }

  public refresh() {
    const authRefreshToken = this.authRefreshTokenValue;

    if (!this.refreshingAuthToken) {
      this.refreshingAuthToken = true;
      this.authRefreshTokenSubject.next(null);

      return this.httpClient.post<JwtResponse>(`${environment.apiUrl}/token/refresh`, { refresh_token: authRefreshToken }).pipe(
        first(),
        tap(response => {
          this.setToken(response);
        }),
        finalize(() => {
          this.refreshingAuthToken = false;
        })
      );
    } else {
      this.refreshingAuthToken = false;

      return this.authRefreshToken.pipe(
        first(token => token !== null)
      );
    }
  }

  public logout() {
    this.removeToken();
  }
}
