// Angular
import { NgModule } from '@angular/core';
// Directives
import { DeactivateDirective } from './directives/deactivate';
import { DropdownDirective } from './directives/dropdown';
import { IfMatchMediaDirective } from './directives/if-match-media';
import { IfMobileDirective } from './directives/if-mobile';
import { JumpDirective } from './directives/jump';
import { SelectListDirective } from './directives/select-list';
import { SelectOptionDirective } from './directives/select-option';
import { ToggleDirective } from './directives/toggle';

@NgModule({
  declarations: [
    DeactivateDirective,
    DropdownDirective,
    IfMatchMediaDirective,
    IfMobileDirective,
    JumpDirective,
    SelectListDirective,
    SelectOptionDirective,
    ToggleDirective
  ],
  exports: [
    DeactivateDirective,
    DropdownDirective,
    IfMatchMediaDirective,
    IfMobileDirective,
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
