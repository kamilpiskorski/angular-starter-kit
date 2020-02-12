// Angular
import { Component, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';
// Models
import { FORM_FIELD_COMPONENT, FormFieldComponentType } from '../../models';

let formFieldId = 0;

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  providers: [{
    provide: FORM_FIELD_COMPONENT,
    useExisting: FormFieldComponent
  }]
})
export class FormFieldComponent implements FormFieldComponentType {

  @ContentChild(NgControl, { static: true })
  public control: NgControl;

  public id: string;
  public focused: boolean;

  constructor() {
    this.id = `form-field-${++formFieldId}`;
  }

  public get filled() {
    return !!this.control.value;
  }

  public get error() {
    return this.control.touched && this.control.invalid;
  }

  public get disabled() {
    return this.control.disabled;
  }
}
