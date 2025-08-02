import { JsonPipe } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export type inputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor {
  control = input.required<FormControl<any>>();
  id = input.required<string>();
  label = input.required<string>();
  type = input<inputType>('text');

  get formatId() {
    return `${this.id()}-input`;
  }

  onTouched = () => {};
  onChange = (_value: any) => {};

  writeValue(value: any): void {
    if (value !== this.control().value) {
      this.control().setValue(value, { emitEvent: false });
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control().disable() : this.control().enable();
  }
}
