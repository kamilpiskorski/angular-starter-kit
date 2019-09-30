// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
// import { Component } from './components/component';
// Directives
import { ToggleDirective } from './directives/toggle';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ToggleDirective
  ],
  exports: [
    CommonModule,
    ToggleDirective
  ]
})
export class SharedModule {
}
