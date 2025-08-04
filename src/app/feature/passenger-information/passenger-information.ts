import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Form } from './components/form/form';
import { Data } from './components/data/data';
import { PassengerData, PassengerItemForm } from '../../core/models/passenger';

export type CustomFormGroup = FormGroup<PassengerItemForm>;

@Component({
  selector: 'app-passenger-information',
  imports: [ReactiveFormsModule, Form, Data ],
  templateUrl: './passenger-information.html',
  styleUrl: './passenger-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerInformation {
  data: PassengerData = {};

  handleData(data: PassengerData) {
    this.data = data;
  }
}
