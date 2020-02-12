// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Libs
import { CoreModule } from '@app/libs/core/core.module';
// Components
import { AutocompleteComponent } from './components/autocomplete';
import { CheckboxComponent } from './components/checkbox';
import { DatepickerComponent } from './components/datepicker';
import { FormFieldComponent } from './components/form-field';
import { RadioButtonComponent } from './components/radio-button';
import { RadioGroupComponent } from './components/radio-group';
import { SelectComponent } from './components/select';
// Directives
import { FormControlDirective } from './directives/form-control';
import { FormLabelDirective } from './directives/form-label';
import { OptionDirective } from './directives/option';
import { PasswordToggleDirective } from './directives/password-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule
  ],
  declarations: [
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    SelectComponent,
    FormControlDirective,
    FormLabelDirective,
    OptionDirective,
    PasswordToggleDirective
  ],
  exports: [
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    SelectComponent,
    FormControlDirective,
    FormLabelDirective,
    OptionDirective,
    PasswordToggleDirective
  ]
})
export class FormModule {

  constructor() {
  }
}
