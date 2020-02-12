// Angular
import { ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

export abstract class SelectOption {

  @Output()
  public select: EventEmitter<void>;

  public focused: boolean;
  public element: HTMLElement;

  protected constructor(elementRef: ElementRef<HTMLElement>) {
    this.select = new EventEmitter();
    this.element = elementRef.nativeElement;
  }

  @HostListener('document:keyup.enter', ['$event'])
  public selectKeyboardHandler(event: KeyboardEvent) {
    if (!this.focused) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.selectHandler();
  }

  @HostListener('click')
  public selectHandler() {
    this.select.emit();
  }

  public focus() {
    this.focused = true;
    this.element.scrollIntoView({ block: 'nearest' });
  }

  public blur() {
    this.focused = false;
  }
}
