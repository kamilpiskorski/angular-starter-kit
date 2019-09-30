// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import { LoginPageComponent } from './pages/login-page';
import { PasswordPageComponent } from './pages/password-page';
import { RegisterPageComponent } from './pages/register-page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'password', component: PasswordPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
