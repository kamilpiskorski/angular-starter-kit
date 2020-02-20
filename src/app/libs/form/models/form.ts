// Angular
import { InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FormComponentType {
  form: FormGroup;
  formSending: boolean;
  formValidationSuccess?: boolean;
  formValidationError?: boolean;
}

export const FORM_COMPONENT = new InjectionToken<FormComponentType>('FORM_COMPONENT');
