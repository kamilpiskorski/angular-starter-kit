// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { BaseLayoutComponent } from '@app/layouts/base-layout';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Add other modules with layouts like landing, dashboard…
  // {
  //   path: '',
  //   component: BaseLayoutComponent,
  //   loadChildren: () => import('@app/modules/landing/landing.module').then(m => m.LandingModule)
  // },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
