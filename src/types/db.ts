type WorkingHours = {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
};

export type Restaurant = {
  id: string;
  name: string;
  workingHours: WorkingHours;
  timezoneOffsetMinutes: number;
};

export type Table = {
  id: string;
  restaurant?: Restaurant;
};

type ReservationMetadata = {
  personsToServe: number;
  startTimeUTC: Date;
  endTimeUTC: Date;
  notes?: string;
};

export type Reservation = {
  id: string;
  table?: Table;
  guest?: Guest;
  meta: ReservationMetadata;
};

export type Guest = {
  id: string;
  name: string;
  phonenumber: string;
};
