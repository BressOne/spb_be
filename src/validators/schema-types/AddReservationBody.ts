type ReservationMetadata = {
  personsToServe: number;
  startTime: Date;
  endTime: Date;
  notes?: string;
};

type AddReservationBody = {
  tableId: string;
  guestName: string;
  meta: ReservationMetadata;
};

export default AddReservationBody;
