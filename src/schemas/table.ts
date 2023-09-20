import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const TableSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
});

export default model('TableSchema', TableSchema);
