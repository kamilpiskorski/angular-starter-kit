// Angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Guards
import { AuthGuard } from './guards/auth.guard';
// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
// Services
import { AuthService } from './services/auth.service';

const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthInterceptorProvider
  ]
})
export class AuthModule {

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule has already been loaded. Import AuthModule modules in the AppModule only.');
    }
  }

  public static forRoot(authUrl: string): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: 'AUTH_URL', useValue: authUrl },
        AuthService
      ]
    };
  }
}
