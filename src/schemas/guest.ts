import { Schema, model, Types } from 'mongoose';
import { v4 } from 'uuid';

const guestSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  name: { type: String, required: true },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    // validate: new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$', 'g'),
  },
});

export default model('guestSchema', guestSchema);
