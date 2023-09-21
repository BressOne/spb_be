import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const UserSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  restaurantOrigin: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model('UserSchema', UserSchema);
