// Angular
import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { NgControl } from '@angular/forms';
// Models
import { SelectList } from '@app/libs/core/models';
import { FORM_FIELD_COMPONENT, SELECT_COMPONENT, SelectComponentType } from '../../models';
// Directives
import { OptionDirective } from '../../directives/option';
// External
import { Subscription } from 'rxjs';

let autocompleteId = 0;

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: FORM_FIELD_COMPONENT,
      useExisting: AutocompleteComponent
    },
    {
      provide: SELECT_COMPONENT,
      useExisting: AutocompleteComponent
    }
  ]
})
export class AutocompleteComponent extends SelectList implements AfterViewInit, OnDestroy, SelectComponentType {

  @ContentChildren(OptionDirective)
  public optionList: QueryList<OptionDirective>;

  @Input()
  public debounceTime: number;

  @Output()
  public search: EventEmitter<string>;

  public id: string;
  public value: any;
  public valueLabel: string;

  public focused: boolean;
  public disabled: boolean;

  private searchDebounceTimeout: number;
  private optionListChangesSubscription: Subscription;

  constructor(private control: NgControl) {
    super();

    this.id = `autocomplete-${++autocompleteId}`;
    this.control.valueAccessor = this;
    this.debounceTime = 250;
    this.search = new EventEmitter();
  }

  ngAfterViewInit() {
    this.optionListChangesSubscription = this.optionList.changes.subscribe(() => {
      this.isShowOptionList = this.focused && !!this.optionList.length;

      if (this.isShowOptionList) {
        this.focusFirstOption();
      }
    });
  }

  ngOnDestroy() {
    if (!!this.optionListChangesSubscription) {
      this.optionListChangesSubscription.unsubscribe();
    }
  }

  public get filled() {
    return !!this.value || !!this.valueLabel;
  }

  public get error() {
    return this.control.touched && this.control.invalid;
  }

  public focusHandler() {
    this.focused = true;
    this.isShowOptionList = !!this.optionList.length;

    if (this.isShowOptionList) {
      this.focusSelectedOption();
    } else {
      this.search.emit(this.valueLabel);
    }
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

  public focusFirstOption() {
    this.indexFocusedOption = 0;

    window.setTimeout(() => {
      this.optionList.first.focus();
    });
  }

  public focusSelectedOption() {
    const optionListArray = this.optionList.toArray();
    this.indexFocusedOption = optionListArray.findIndex(option => option.selected);

    if (this.indexFocusedOption !== -1) {
      window.setTimeout(() => {
        optionListArray[this.indexFocusedOption].focus();
      });
    }
  }

  public searchHandler(query: string) {
    this.value = null;
    this.changeHandler(null);

    if (this.debounceTime === 0) {
      this.search.emit(query);
      return;
    }

    window.clearTimeout(this.searchDebounceTimeout);

    this.searchDebounceTimeout = window.setTimeout(() => {
      this.search.emit(query);
    }, this.debounceTime);
  }
}
