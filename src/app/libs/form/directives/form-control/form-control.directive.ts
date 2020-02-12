// Angular
import { Directive, HostBinding, HostListener, Inject } from '@angular/core';
// Models
import { FORM_FIELD_COMPONENT, FormFieldComponentType } from '../../models';

@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

  constructor(@Inject(FORM_FIELD_COMPONENT) private formGroupComponent: FormFieldComponentType) {
  }

  @HostBinding('attr.id')
  public get id() {
    return this.formGroupComponent.id;
  }

  @HostListener('focus')
  public focusHandler() {
    this.formGroupComponent.focused = true;
  }

  @HostListener('blur')
  public blurHandler() {
    this.formGroupComponent.focused = false;
  }
}
