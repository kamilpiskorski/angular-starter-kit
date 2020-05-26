// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Config
import { environment } from '@env/environment';
// Libs
import { AuthModule } from '@app/libs/auth/auth.module';
// Layouts
import { BaseLayoutComponent } from '@app/layouts/base-layout';
// Components
import { AppComponent } from '@app/app.component';
// Shared
import { SharedModule } from '@app/shared/shared.module';
// Routing
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule.forRoot(environment.authUrl),
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BaseLayoutComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor() {
  }
}
