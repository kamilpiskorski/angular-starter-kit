// Angular
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appJump]'
})
export class JumpDirective {

  @Input('appJump')
  public element: HTMLElement;

  constructor() {
  }

  @HostListener('click')
  public clickHandler() {
    this.element.scrollIntoView();
  }
}
