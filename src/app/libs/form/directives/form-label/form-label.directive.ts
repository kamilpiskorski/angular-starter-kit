// Angular
import { Directive, HostBinding, Inject } from '@angular/core';
// Models
import { FORM_FIELD_COMPONENT, FormFieldComponentType } from '../../models';

@Directive({
  selector: '[appFormLabel]'
})
export class FormLabelDirective {

  constructor(@Inject(FORM_FIELD_COMPONENT) private formGroupComponent: FormFieldComponentType) {
  }

  @HostBinding('attr.for')
  public get for() {
    return this.formGroupComponent.id;
  }
}
