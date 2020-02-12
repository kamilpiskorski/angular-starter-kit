// Angular
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
// External
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, first, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  public authToken: Observable<string>;
  public authRefreshToken: Observable<string>;

  private authTokenSubject: BehaviorSubject<string>;
  private authRefreshTokenSubject: BehaviorSubject<string>;

  private refreshingAuthToken: boolean;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId, private httpClient: HttpClient, @Inject('AUTH_URL') private authUrl: string) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const authToken = this.isBrowser ? window.localStorage.getItem('authToken') : null;
    const authRefreshToken = this.isBrowser ? window.localStorage.getItem('authRefreshToken') : null;

    this.authTokenSubject = new BehaviorSubject(authToken);
    this.authToken = this.authTokenSubject.asObservable();

    this.authRefreshTokenSubject = new BehaviorSubject(authRefreshToken);
    this.authRefreshToken = this.authRefreshTokenSubject.asObservable();
  }

  public get authTokenValue() {
    return this.authTokenSubject.value;
  }

  public get authRefreshTokenValue() {
    return this.authRefreshTokenSubject.value;
  }

  public setToken(token: string) {
    if (this.isBrowser) {
      window.localStorage.setItem('authToken', token);
    }

    this.authTokenSubject.next(token);
  }

  public setRefreshToken(token: string) {
    if (this.isBrowser) {
      window.localStorage.setItem('authRefreshToken', token);
    }

    this.authRefreshTokenSubject.next(token);
  }

  public getAuthorizationRequest(request: HttpRequest<any>) {
    if (!!this.authTokenValue && !request.url.includes(this.authUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authTokenValue}`,
        },
      });
    }

    return request;
  }

  public authorizationHandler(request: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshingAuthToken && !request.url.includes(this.authUrl)) {
      return this.refreshHandler(request, next);
    }

    return next.handle(this.getAuthorizationRequest(request));
  }

  public refreshHandler(request: HttpRequest<any>, next: HttpHandler) {
    const authRefreshToken: Observable<any> = this.refresh();

    return authRefreshToken.pipe(
      switchMap(() => {
        return next.handle(this.getAuthorizationRequest(request));
      })
    );
  }

  public login(username: string, password: string) {
    return this.httpClient.post(this.authUrl, { username, password });
  }

  public refresh() {
    if (this.refreshingAuthToken) {
      return this.authRefreshToken.pipe(
        first(token => token !== null),
        finalize(() => {
          this.refreshingAuthToken = false;
        })
      );
    }

    const refreshToken = this.authRefreshTokenValue;

    this.refreshingAuthToken = true;
    this.authRefreshTokenSubject.next(null);

    return this.httpClient.post(`${this.authUrl}/refresh`, { refreshToken }).pipe(
      tap((response: { token: string; refreshToken: string; }) => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
      }),
      finalize(() => {
        this.refreshingAuthToken = false;
      })
    );
  }

  public logout() {
    if (this.isBrowser) {
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('authRefreshToken');
    }

    this.authTokenSubject.next(null);
    this.authRefreshTokenSubject.next(null);
  }
}
