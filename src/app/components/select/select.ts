import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

export interface SelectOptions {
  id: number;
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor, OnInit {
  control = input.required<FormControl<any>>();
  modelChange = output<any>();
  label = input.required<string>();
  options = input.required<SelectOptions[]>();

  onTouched = () => {};
  onChange = (_value: any) => {};

  ngOnInit(): void {
    this.control().valueChanges.subscribe((value) => {
      this.modelChange.emit(value);
    });
  }

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

  emitModelChange(value: any) {
    this.modelChange.emit(value);
  }
}
