type Timeframe = {
  start: string;
  end: string;
};

type WorkingHours = {
  monday?: Timeframe;
  tuesday?: Timeframe;
  wednesday?: Timeframe;
  thursday?: Timeframe;
  friday?: Timeframe;
  saturday?: Timeframe;
  sunday?: Timeframe;
};

export type Restaurant = {
  id: string;
  name: string;
  workingHours: WorkingHours;
  timezoneOffsetMinutes: number;
};

export type Table<T = Restaurant> = {
  id: string;
  restaurant?: T;
};

type ReservationMetadata = {
  personsToServe: number;
  startTimeUTC: Date;
  endTimeUTC: Date;
  notes?: string;
};

export type Reservation<T = Table, K = Guest> = {
  id: string;
  table?: T;
  guest?: K;
  meta: ReservationMetadata;
};

export type Guest = {
  id: string;
  name: string;
  phonenumber: string;
};
