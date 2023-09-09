import { Schema, model, Types } from 'mongoose';

const guestSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: Types.ObjectId, ref: 'TableSchema', required: true },
  phonenumber: {
    type: String,
    required: true,
    validate: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim,
  },
});

export default model('guestSchema', guestSchema);
