import { Schema, model, Types } from 'mongoose';
import { v4 } from 'uuid';

const ReservationSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  table: { type: Types.ObjectId, ref: 'TableSchema', required: true },
  guest: { type: Types.ObjectId, ref: 'GuestSchema', required: true },
  meta: {
    personsToServe: { type: Number, required: true },
    startTimeUTC: { type: Date, required: true },
    endTimeUTC: { type: Date, required: true },
    notes: { type: String, required: true },
  },
});

export default model('ReservationSchema', ReservationSchema);
