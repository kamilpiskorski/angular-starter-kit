// Angular
import { NgModule } from '@angular/core';
// Pages
import { AuthLoginPageComponent } from './pages/auth-login-page';
import { AuthPasswordPageComponent } from './pages/auth-password-page';
import { AuthRegisterPageComponent } from './pages/auth-register-page';
// Routing
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule
  ],
  declarations: [
    AuthLoginPageComponent,
    AuthPasswordPageComponent,
    AuthRegisterPageComponent
  ]
})
export class AuthModule {

  constructor() {
  }
}
