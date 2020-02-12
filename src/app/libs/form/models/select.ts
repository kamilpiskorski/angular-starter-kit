// Angular
import { InjectionToken } from '@angular/core';
// Models
import { FormControlComponentType } from './form-control';

export interface SelectComponentType extends FormControlComponentType {
  valueLabel: string;
  selectOption: (value: any, valueLabel: string) => void;
}

export const SELECT_COMPONENT = new InjectionToken<SelectComponentType>('SELECT_COMPONENT');
