import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PassengerInformationForm } from './components/passenger-information-form/passenger-information-form';
import { PassengerInformationData } from './components/passenger-information-data/passenger-information-data';
import { PassengerData, PassengerItemForm } from '../../core/models/passenger';

export type CustomFormGroup = FormGroup<PassengerItemForm>;

@Component({
  selector: 'app-passenger-information',
  imports: [
    ReactiveFormsModule,
    PassengerInformationForm,
    PassengerInformationData,
  ],
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
