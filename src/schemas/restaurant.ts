import { Schema, model } from 'mongoose';

const RestaurantSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  workingHours: {
    monday: { type: String, required: false },
    tuesday: { type: String, required: false },
    wednesday: { type: String, required: false },
    thursday: { type: String, required: false },
    friday: { type: String, required: false },
    saturday: { type: String, required: false },
    sunday: { type: String, required: false },
  },
  timezoneOffsetMinutes: { type: Number, required: true },
});

export default model('RestaurantSchema', RestaurantSchema);
