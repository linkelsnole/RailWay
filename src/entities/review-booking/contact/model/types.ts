export interface PassengerContact {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD
}

export interface ContactState {
  passengers: PassengerContact[];
}