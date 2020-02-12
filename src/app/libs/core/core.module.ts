// Angular
import { NgModule } from '@angular/core';
// Directives
import { DeactivateDirective } from './directives/deactivate';
import { JumpDirective } from './directives/jump';
import { SelectListDirective } from './directives/select-list';
import { SelectOptionDirective } from './directives/select-option';
import { ToggleDirective } from './directives/toggle';

@NgModule({
  imports: [],
  declarations: [
    DeactivateDirective,
    JumpDirective,
    SelectListDirective,
    SelectOptionDirective,
    ToggleDirective
  ],
  exports: [
    DeactivateDirective,
    JumpDirective,
    SelectListDirective,
    SelectOptionDirective,
    ToggleDirective
  ]
})
export class CoreModule {

  constructor() {
  }
}
