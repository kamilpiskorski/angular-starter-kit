// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modules
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
// Layouts
import { BaseLayoutComponent } from '@app/layouts/base-layout';
// Components
import { AppComponent } from '@app/app.component';
// Routing
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
  imports: [
    BrowserModule,

    CoreModule,
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
}
