import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PassengerData } from '../../../../core/models/passenger';

@Component({
  selector: 'app-data',
  imports: [JsonPipe],
  templateUrl: './data.html',
  styleUrl: './data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Data {
  data = input.required<PassengerData>();
}
