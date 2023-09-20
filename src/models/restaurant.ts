import { Restaurant } from '../types/db';
import RestaurantSchema from '../schemas/restaurant';

const findRestaurant = async (filter: any): Promise<Restaurant | null> => RestaurantSchema.findOne(filter);
const addRestaurant = async (data: Restaurant) => await RestaurantSchema.create(data);
const updateRestaurantByFilter = async (
  filter: any,
  newData: { $set?: Partial<Omit<Restaurant, 'id'>> }
): Promise<Restaurant | null> => RestaurantSchema.findOneAndUpdate(filter, newData, { new: true });

export { findRestaurant, addRestaurant, updateRestaurantByFilter };
