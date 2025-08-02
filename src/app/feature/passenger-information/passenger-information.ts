import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Input } from '../../components/input/input';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Button } from '../../components/button/button';
import {
  RadioButton,
  RadioButtonOptions,
} from '../../components/radio-button/radio-button';

export interface PassengerItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  documentType: FormControl<number | null>;
  dni: FormControl<number | null>;
  gender: FormControl<string | null>;
}

export type CustomFormGroup = FormGroup<PassengerItemForm>;

@Component({
  selector: 'app-passenger-information',
  imports: [ReactiveFormsModule, Input, RadioButton, Button, JsonPipe],
  templateUrl: './passenger-information.html',
  styleUrl: './passenger-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerInformation {
  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  get items() {
    return this.form.controls.items;
  }

  get lastItem() {
    return this.form.controls.items?.at(-1)?.value;
  }

  genderOptions: RadioButtonOptions[] = [
    { id: 1, label: 'Female', value: 'F' },
    { id: 2, label: 'Male', value: 'M' },
  ];

  addItem() {
    let id = this.items.length + 1;
    if (this.lastItem) {
      id = (this.lastItem.id || 0) + 1;
    }
    const itemForm = this.fb.group<PassengerItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      lastName: this.fb.control('', { validators: [Validators.required] }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      documentType: this.fb.control(null, {
        validators: [Validators.required],
      }),
      dni: this.fb.control(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      }),
      gender: this.fb.control(null, { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);
  }

  removeItem(id: number) {
    this.form.controls.items.removeAt(id);
  }
}
