import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const ReservationSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  tableId: { type: String, required: true },
  guestName: { type: String, required: true },
  meta: {
    personsToServe: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    notes: { type: String },
  },
});

export default model('ReservationSchema', ReservationSchema);
