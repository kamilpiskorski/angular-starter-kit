// Angular
import { Component } from '@angular/core';
import { NgControl } from '@angular/forms';
// Models
import { FORM_CONTROL_COMPONENT, FormControlComponentType } from '../../models';

let checkboxId = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [{
    provide: FORM_CONTROL_COMPONENT,
    useExisting: CheckboxComponent
  }]
})
export class CheckboxComponent implements FormControlComponentType {

  public id: string;
  public value: any;

  public focused: boolean;
  public disabled: boolean;

  constructor(private control: NgControl) {
    this.id = `checkbox-${++checkboxId}`;
    this.control.valueAccessor = this;
  }

  public get filled() {
    return !!this.value;
  }

  public get error() {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  public focusHandler() {
    this.focused = true;
  }

  public blurHandler() {
    this.focused = false;
    this.touchedHandler();
  }

  public changeHandler(value: any) {
  }

  public touchedHandler() {
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(callback) {
    this.changeHandler = callback;
  }

  public registerOnTouched(callback) {
    this.touchedHandler = callback;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
