// Angular
import { InjectionToken } from '@angular/core';

export interface FormFieldComponentType {
  id: string;
  focused: boolean;
  filled: boolean;
  error: boolean;
  disabled: boolean;
}

export const FORM_FIELD_COMPONENT = new InjectionToken<FormFieldComponentType>('FORM_FIELD_COMPONENT');
