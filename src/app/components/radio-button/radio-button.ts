import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { RadioButtonControl } from './radio-button-control/radio-button-control';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export interface RadioButtonOptions {
  id: number;
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-button',
  imports: [ReactiveFormsModule, FormsModule, RadioButtonControl],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButton),
      multi: true,
    },
  ],
})
export class RadioButton implements ControlValueAccessor {
  control = input.required<FormControl<any>>();
  options = input.required<RadioButtonOptions[]>();
  name = input.required<string>();
  label = input.required<string>();

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
    if (isDisabled === this.control().disabled) return;
    
    isDisabled ? this.control().disable() : this.control().enable();
  }
}
