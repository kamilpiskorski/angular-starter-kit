// Angular
import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
// Models
import { SelectList } from '@app/libs/core/models';
import { FORM_FIELD_COMPONENT, SELECT_COMPONENT, SelectComponentType } from '../../models';
// Directives
import { OptionDirective } from '../../directives/option';

let selectId = 0;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: FORM_FIELD_COMPONENT,
      useExisting: SelectComponent
    },
    {
      provide: SELECT_COMPONENT,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent extends SelectList implements SelectComponentType {

  @ContentChildren(OptionDirective)
  public optionList: QueryList<OptionDirective>;

  @ViewChild('button', { static: true })
  public buttonRef: ElementRef<HTMLButtonElement>;

  @Input()
  public placeholder: string;

  public id: string;
  public value: any;
  public valueLabel: string;

  public focused: boolean;
  public disabled: boolean;

  constructor(private control: NgControl) {
    super();

    this.id = `select-${++selectId}`;
    this.control.valueAccessor = this;
    this.placeholder = 'Wybierz…';
  }

  public get filled() {
    return !!this.value || !!this.valueLabel;
  }

  public get error() {
    return this.control.touched && this.control.invalid;
  }

  public focusHandler() {
    this.focused = true;
  }

  public blurHandler() {
    this.focused = false;
    this.touchedHandler();
  }

  public changeHandler(value: any) {
  }

  public touchedHandler() {
  }

  public writeValue(value: any) {
    this.value = value;

    const selectedOption = this.optionList && this.optionList.find(option => option.selected);

    if (selectedOption) {
      this.valueLabel = selectedOption.valueLabel;
    }
  }

  public registerOnChange(callback) {
    this.changeHandler = callback;
  }

  public registerOnTouched(callback) {
    this.touchedHandler = callback;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  public selectOption(value: any, valueLabel: string) {
    this.value = value;
    this.valueLabel = valueLabel;

    this.closeOptionList();
    this.changeHandler(value);
  }

  public showOptionsToggle() {
    this.isShowOptionList = !this.isShowOptionList;

    if (this.isShowOptionList) {
      this.indexFocusedOption = -1;
      this.buttonRef.nativeElement.focus();
    }
  }
}

