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

export type Table = {
  id: string;
  name: string;
  restaurantId: string;
};

type ReservationMetadata = {
  personsToServe: number;
  startTime: Date;
  endTime: Date;
  notes?: string;
};

export type Reservation = {
  id: string;
  tableId: string;
  guestName: string;
  meta: ReservationMetadata;
};

export type User = {
  id: string;
  username: string;
  restaurantOrigin: string;
  password: string;
};

export const week: Array<keyof WorkingHours> = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
