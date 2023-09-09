import { Schema, model } from 'mongoose';

const TableSchema = new Schema({
  id: { type: String, unique: true, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'RestaurantSchema', required: true },
});

export default model('TableSchema', TableSchema);
