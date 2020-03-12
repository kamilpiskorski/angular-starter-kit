// Angular
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private ngControl: NgControl) {
  }

  @HostListener('input', ['$event.target.value'])
  public inputHandler(value: string) {
    this.ngControl.control.patchValue(value.replace(/[^\d]/g, ''));
  }
}
