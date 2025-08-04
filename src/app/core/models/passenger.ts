import { FormControl } from '@angular/forms';

export interface Passenger {
  id?: number;
  name?: string;
  lastName?: string;
  email?: string;
  documentType?: string;
  dni?: number;
  gender?: string | number;
}

export interface PassengerData {
  items?: Passenger[];
}

export interface PassengerItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  documentType: FormControl<number | string | null>;
  dni: FormControl<number | null>;
  gender: FormControl<string | null>;
}
