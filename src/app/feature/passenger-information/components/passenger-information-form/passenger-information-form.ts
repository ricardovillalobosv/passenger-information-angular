import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomFormGroup } from '../../passenger-information';
import { Input } from '../../../../components/input/input';
import {
  RadioButton,
  RadioButtonOptions,
} from '../../../../components/radio-button/radio-button';
import { Select, SelectOptions } from '../../../../components/select/select';
import { Button } from '../../../../components/button/button';
import {
  PassengerData,
  PassengerItemForm,
} from '../../../../core/models/passenger';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-passenger-information-form',
  imports: [
    ReactiveFormsModule,
    Input,
    RadioButton,
    Select,
    Button,
    TranslatePipe
  ],
  templateUrl: './passenger-information-form.html',
  styleUrl: './passenger-information-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerInformationForm implements OnInit {
  sentData = output<PassengerData>();

  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  genderOptions: RadioButtonOptions[] = [
    { id: 1, label: 'Female', value: 'F' },
    { id: 2, label: 'Male', value: 'M' },
  ];

  documentTypeOptions: SelectOptions[] = [
    { id: 1, label: 'DNI', value: 'D' },
    { id: 2, label: 'Foreigners identity card', value: 'F' },
  ];

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      const data = { ...value } as PassengerData;
      this.emitData(data);
    });
  }

  get items() {
    return this.form.controls.items;
  }

  get lastItem() {
    return this.form.controls.items?.at(-1)?.value;
  }

  emitData(data: PassengerData) {
    this.sentData.emit(data);
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
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      documentType: this.fb.control(null, {
        validators: [Validators.required],
      }),
      documentNumber: this.fb.control(null, {
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

  handleDocumentType(documentType: string, formGroup: FormGroup) {
    const documentNumber = formGroup.controls['documentNumber'];
    if (documentType === 'D') {
      this.documentValidations(documentNumber, 8);
    } else {
      this.documentValidations(documentNumber, 11);
    }
  }

  documentValidations(control: AbstractControl, numberCharacters: number) {
    control.setValidators(null);
    control.updateValueAndValidity();
    control.setValidators([
      Validators.minLength(numberCharacters),
      Validators.maxLength(numberCharacters),
    ]);
    control.setValue(null);
  }
}
