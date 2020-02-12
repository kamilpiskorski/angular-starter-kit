// Angular
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
// Models
import { DatepickerI18n, FORM_CONTROL_COMPONENT, FORM_FIELD_COMPONENT, FormControlComponentType } from '../../models';
// External
import * as Pikaday from 'pikaday';

let datepickerId = 0;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [
    {
      provide: FORM_FIELD_COMPONENT,
      useExisting: DatepickerComponent
    },
    {
      provide: FORM_CONTROL_COMPONENT,
      useExisting: DatepickerComponent
    }
  ]
})
export class DatepickerComponent implements AfterViewInit, OnDestroy, FormControlComponentType {

  @ViewChild('input', { static: true })
  public inputRef: ElementRef<HTMLInputElement>;

  @Input()
  public minDate: string;

  @Input()
  public maxDate: string;

  public id: string;
  public value: any;

  public focused: boolean;
  public disabled: boolean;

  public datepicker: Pikaday;

  constructor(private control: NgControl) {
    this.id = `datepicker-${++datepickerId}`;
    this.control.valueAccessor = this;
  }

  ngAfterViewInit() {
    const startDate = !!this.value ? new Date(this.value) : null;
    const minDate = !!this.minDate ? new Date(this.minDate) : null;
    const maxDate = !!this.maxDate ? new Date(this.maxDate) : null;

    this.datepicker = new Pikaday({
      field: this.inputRef.nativeElement,
      firstDay: 1,
      format: 'DD.MM.YYYY',
      minDate,
      maxDate,
      defaultDate: startDate,
      setDefaultDate: !!startDate,
      i18n: DatepickerI18n,
      onSelect: () => {
        this.value = this.datepicker.toString('YYYY-MM-DD');
        this.changeHandler(this.value);
      },
      onClose: () => {
        const date = this.datepicker.getDate();

        if (!date) {
          this.value = null;
          this.changeHandler(null);
        } else {
          this.inputRef.nativeElement.value = this.datepicker.toString();
        }
      }
    });
  }

  ngOnDestroy() {
    if (!!this.datepicker) {
      this.datepicker.destroy();
    }
  }

  public get filled() {
    return !!this.value;
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

    if (!!this.datepicker) {
      this.datepicker.setDate(this.value);
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
}

