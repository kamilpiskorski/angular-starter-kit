// Angular
import { Component, Inject, Input } from '@angular/core';
// Models
import { FORM_CONTROL_COMPONENT, FormControlComponentType } from '../../models';

let radioButtonId = 0;

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {

  @Input()
  public value: any;

  public id: string;
  public name: string;

  constructor(@Inject(FORM_CONTROL_COMPONENT) private formControlComponent: FormControlComponentType) {
    this.id = `radio-button-${++radioButtonId}`;
    this.name = this.formControlComponent.id;
  }

  public get checked() {
    return this.value === this.formControlComponent.value;
  }

  public changeHandler() {
    this.formControlComponent.value = this.value;
    this.formControlComponent.changeHandler(this.value);
  }

  public focusHandler() {
    this.formControlComponent.focusHandler();
  }

  public blurHandler() {
    this.formControlComponent.blurHandler();
  }
}
