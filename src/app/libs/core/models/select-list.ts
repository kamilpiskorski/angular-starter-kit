// Angular
import { EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
// Models
import { SelectOption } from './select-option';

export abstract class SelectList {

  @Input('show')
  public isShowOptionList: boolean;

  @Output('showChange')
  public isShowOptionListChange: EventEmitter<boolean>;

  public optionList: QueryList<SelectOption>;
  public indexFocusedOption: number;

  protected constructor() {
    this.isShowOptionList = false;
    this.isShowOptionListChange = new EventEmitter();
    this.indexFocusedOption = -1;
  }

  @HostListener('document:keydown.escape')
  @HostListener('document:keydown.tab')
  @HostListener('document:keydown.shift.tab')
  public closeOptionList() {
    if (!this.isShowOptionList) {
      return;
    }

    this.isShowOptionList = false;
    this.isShowOptionListChange.emit(false);
    this.optionList.forEach(option => {
      option.blur();
    });
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  @HostListener('document:keydown.arrowdown', ['$event'])
  public focusOption(event: KeyboardEvent) {
    if (!this.isShowOptionList) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.key === 'ArrowUp' && this.indexFocusedOption > 0) {
      this.indexFocusedOption--;
    }

    if (event.key === 'ArrowDown' && this.indexFocusedOption < this.optionList.length - 1) {
      this.indexFocusedOption++;
    }

    this.optionList.forEach((option, index) => {
      if (this.indexFocusedOption === index) {
        option.focus();
      } else {
        option.blur();
      }
    });
  }
}
