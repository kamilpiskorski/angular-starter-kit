// Angular
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  @Input('appToggle')
  public toggleElement: HTMLElement;

  @Input()
  public toggleClass: string;

  constructor() {
    this.toggleClass = 'active';
  }

  @HostListener('click')
  public clickHandler() {
    this.toggleElement.classList.toggle(this.toggleClass);
  }
}
