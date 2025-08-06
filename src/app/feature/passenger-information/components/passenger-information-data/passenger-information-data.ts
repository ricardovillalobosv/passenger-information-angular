import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PassengerData } from '../../../../core/models/passenger';

@Component({
  selector: 'app-passenger-information-data',
  imports: [JsonPipe],
  templateUrl: './passenger-information-data.html',
  styleUrl: './passenger-information-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerInformationData {
  data = input.required<PassengerData>();
}
