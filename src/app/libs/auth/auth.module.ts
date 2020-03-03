// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Directives
import { IfLoggedDirective } from './directives/if-logged';
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
  declarations: [
    IfLoggedDirective
  ],
  exports: [
    IfLoggedDirective
  ]
})
export class AuthModule {

  constructor() {
  }

  public static forRoot(authUrl: string): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: 'AUTH_URL', useValue: authUrl },
        AuthGuard,
        AuthInterceptorProvider,
        AuthService
      ]
    };
  }
}
