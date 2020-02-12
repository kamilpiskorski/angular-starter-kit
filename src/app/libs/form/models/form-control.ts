// Angular
import { InjectionToken } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
// Models
import { FormFieldComponentType } from './form-field';

export interface FormControlComponentType extends ControlValueAccessor, FormFieldComponentType {
  value: any;
  focusHandler: () => void;
  blurHandler: () => void;
  changeHandler: (value: any) => void;
  touchedHandler: () => void;
}

export const FORM_CONTROL_COMPONENT = new InjectionToken<FormControlComponentType>('FORM_CONTROL_COMPONENT');
