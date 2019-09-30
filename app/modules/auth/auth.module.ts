// Angular
import { NgModule } from '@angular/core';
// Pages
import { LoginPageComponent } from './pages/login-page';
import { PasswordPageComponent } from './pages/password-page';
import { RegisterPageComponent } from './pages/register-page';
// Routing
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthRoutingModule
  ],
  declarations: [
    LoginPageComponent,
    PasswordPageComponent,
    RegisterPageComponent
  ]
})
export class AuthModule {
}
