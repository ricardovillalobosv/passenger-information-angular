import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PassengerData } from '../../../../core/models/passenger';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-passenger-information-data',
  imports: [JsonPipe, TranslatePipe],
  templateUrl: './passenger-information-data.html',
  styleUrl: './passenger-information-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengerInformationData {
  data = input.required<PassengerData>();
}
