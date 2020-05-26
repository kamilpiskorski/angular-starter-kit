// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Pages
import { AuthLoginPageComponent } from './pages/auth-login-page';
import { AuthPasswordPageComponent } from './pages/auth-password-page';
import { AuthRegisterPageComponent } from './pages/auth-register-page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: AuthLoginPageComponent },
      {
        path: 'password',
        children: [
          { path: ':token', component: AuthPasswordPageComponent },
          { path: '', component: AuthPasswordPageComponent }
        ]
      },
      { path: 'register', component: AuthRegisterPageComponent },
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

  constructor() {
  }
}
