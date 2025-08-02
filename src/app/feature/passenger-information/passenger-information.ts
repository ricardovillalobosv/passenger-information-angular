import { Component, effect, inject, signal } from '@angular/core';
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

export interface PassengerItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  documentType: FormControl<number | null>;
  dni: FormControl<number | null>;
  gender: FormControl<string>;
}

export type CustomFormGroup = FormGroup<PassengerItemForm>;

@Component({
  selector: 'app-passenger-information',
  imports: [ReactiveFormsModule, Input, Button, JsonPipe],
  templateUrl: './passenger-information.html',
  styleUrl: './passenger-information.scss',
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

  addItem() {
    let id = this.items.length + 1;
    if (this.lastItem) {
      id = (this.lastItem.id || 0) + 1;
    }
    const itemForm = this.fb.group<PassengerItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      lastName: this.fb.control('', { validators: [Validators.required] }),
      email: this.fb.control('', { validators: [Validators.required] }),
      documentType: this.fb.control(null, {
        validators: [Validators.required],
      }),
      dni: this.fb.control(null, { validators: [Validators.required] }),
      gender: this.fb.control('', { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);
  }

  removeItem(id: number) {
    console.log(id)
    this.form.controls.items.removeAt(id);
    console.log(this.form.controls.items.value)
  }
}
