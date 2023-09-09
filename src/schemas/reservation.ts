import { Schema, model, Types } from 'mongoose';

const ReservationSchema = new Schema({
  id: { type: String, unique: true, required: true },
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
