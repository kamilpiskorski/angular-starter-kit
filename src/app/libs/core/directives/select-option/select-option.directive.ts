// Angular
import { Directive, ElementRef, HostBinding } from '@angular/core';
// Models
import { SelectOption } from '../../models';

@Directive({
  selector: '[appSelectOption]'
})
export class SelectOptionDirective extends SelectOption {

  @HostBinding('class.focused')
  public focused: boolean;

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }
}
