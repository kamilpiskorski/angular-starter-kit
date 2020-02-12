// Angular
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective {

  @Input('appPasswordToggle')
  public inputElement: HTMLElement;

  constructor() {
  }

  @HostListener('click')
  public toggleHandler() {
    const inputType = this.inputElement.getAttribute('type');

    if (inputType === 'password') {
      this.inputElement.setAttribute('type', 'text');
    } else {
      this.inputElement.setAttribute('type', 'password');
    }

    this.inputElement.focus();
  }
}
