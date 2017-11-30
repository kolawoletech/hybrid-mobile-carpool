import { Place } from './place.model';

export class Journey {
  createrEmail: string;
  passengerEmails: string[];
  pickupLocation: Place;
  dropoffLocation: Place;
  numberOfPassengers: number;
  createdTime: string;
}
