import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-radio-button-control',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './radio-button-control.html',
  styleUrl: './radio-button-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonControl),
      multi: true,
    },
  ],
})
export class RadioButtonControl implements ControlValueAccessor {
  // control = input.required<FormControl<any>>();
  value_: any;
  value = input.required<any>();
  id = input.required<string | number>();
  name = input.required<string>();
  label = input.required<string>();

  get inputID() {
    return `id-${this.id()}-${this.name()}`;
  }

  onTouched = () => {};
  onChange = (_value: any) => {};

  writeValue(value: any): void {
    this.value_ = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? console.log('disabled') : console.log('not disabled');
  }
}
