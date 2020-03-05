// Angular
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDeactivate]'
})
export class DeactivateDirective {

  @Output()
  public deactivate: EventEmitter<void>;

  private readonly element: HTMLElement;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef.nativeElement;
    this.deactivate = new EventEmitter();
  }

  @HostListener('document:click', ['$event'])
  public clickHandler(event: MouseEvent) {
    if (!this.element.contains((event.target as HTMLElement))) {
      this.deactivate.emit();
    }
  }

  @HostListener('keydown.escape')
  @HostListener('keydown.tab')
  @HostListener('keydown.shift.tab')
  public keyboardHandler() {
    this.deactivate.emit();
  }
}
