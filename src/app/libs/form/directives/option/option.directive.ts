// Angular
import { AfterViewInit, Directive, ElementRef, HostBinding, Inject, Input, OnDestroy } from '@angular/core';
// Models
import { SelectOption } from '@app/libs/core/models';
import { SELECT_COMPONENT, SelectComponentType } from '../../models';
// External
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appOption]'
})
export class OptionDirective extends SelectOption implements AfterViewInit, OnDestroy {

  @Input()
  public value: any;

  @Input()
  public valueLabel: string;

  @HostBinding('class.focused')
  public focused: boolean;

  private selectSubscription: Subscription;

  constructor(private elementRef: ElementRef<HTMLElement>, @Inject(SELECT_COMPONENT) private selectComponent: SelectComponentType) {
    super(elementRef);
  }

  ngAfterViewInit() {
    this.selectSubscription = this.select.subscribe(() => {
      this.selectComponent.selectOption(this.value, this.valueLabel);
    });

    if (!this.valueLabel) {
      this.valueLabel = this.element.innerText;
    }

    if (!this.selectComponent.valueLabel && this.selected) {
      this.selectComponent.valueLabel = this.valueLabel;
    }
  }

  ngOnDestroy() {
    if (!!this.selectSubscription) {
      this.selectSubscription.unsubscribe();
    }
  }

  @HostBinding('class.selected')
  public get selected() {
    return this.selectComponent.value === this.value;
  }
}
