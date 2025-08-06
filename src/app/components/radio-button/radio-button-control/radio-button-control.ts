import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
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
  value_: any;
  value = input.required<any>();
  id = input.required<string | number>();
  name = input.required<string>();
  label = input.required<string>();

  isDisabled = signal(false);

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
    this.isDisabled.set(isDisabled);
  }
}
