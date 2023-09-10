import { ObjectId, Document } from 'mongoose';
import { Restaurant } from 'src/types/db';
import RestaurantSchema from '../schemas/restaurant';

const findRestaurant = async (filter: any): Promise<Document<ObjectId, any, Restaurant> | null> =>
  RestaurantSchema.findOne(filter);
const addRestaurant = async (data: Restaurant) => new RestaurantSchema(data).save();
const updateRestaurantByFilter = async (
  filter: any,
  newData: { $set?: Partial<Omit<Restaurant, 'id'>> }
): Promise<Document<ObjectId, any, Restaurant> | null> =>
  RestaurantSchema.findOneAndUpdate(filter, newData, { new: true });

export { findRestaurant, addRestaurant, updateRestaurantByFilter };
