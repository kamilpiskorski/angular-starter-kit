// Angular
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormHelpers {

  constructor() {
  }

  public static touchedAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        FormHelpers.touchedAllFormFields(control);
      }
    });
  }
}