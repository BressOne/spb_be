import { Schema, model } from 'mongoose';
import { v4 } from 'uuid';

const TableSchema = new Schema({
  id: { type: String, unique: true, required: true, default: v4() },
  restaurant: { type: Schema.Types.ObjectId, ref: 'RestaurantSchema', required: true },
});

export default model('TableSchema', TableSchema);
