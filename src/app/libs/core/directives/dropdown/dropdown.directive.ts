// Angular
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'dropdown'
})
export class DropdownDirective {

  @Input()
  public visible: boolean;

  @Output()
  public visibleChange: EventEmitter<boolean>;

  private readonly element: HTMLElement;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.element = elementRef.nativeElement;
    this.visibleChange = new EventEmitter();
  }

  @HostListener('document:click', ['$event'])
  public clickHandler(event: MouseEvent) {
    if (!this.element.contains((event.target as HTMLElement))) {
      this.hideDropdown();
    } else {
      this.toggleDropdown();
    }
  }

  @HostListener('keydown.escape')
  @HostListener('keydown.tab')
  @HostListener('keydown.shift.tab')
  public hideDropdown() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  public toggleDropdown() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }
}
