import mongoose, { Schema, model } from 'mongoose';
import { Restaurant } from '../types/db';
import { v4 } from 'uuid';

const Timeframe = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const RestaurantSchema = new Schema<Restaurant>({
  id: { type: String, unique: true, required: true, default: v4() },
  name: { type: String, required: true },
  workingHours: {
    monday: { type: Timeframe, required: false },
    tuesday: { type: Timeframe, required: false },
    wednesday: { type: Timeframe, required: false },
    thursday: { type: Timeframe, required: false },
    friday: { type: Timeframe, required: false },
    saturday: { type: Timeframe, required: false },
    sunday: { type: Timeframe, required: false },
  },
  timezoneOffsetMinutes: { type: Number, required: true },
});

export default model('RestaurantSchema', RestaurantSchema);
