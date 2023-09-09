import { Restaurant } from 'src/types/db';
import RestaurantSchema from '../schemas/restaurant';

const getRestaurant = async (filter: any): Promise<Restaurant> => RestaurantSchema.findOne(filter).lean();
const updateRestaurantByFilter = async (filter: any, newData: { $set?: Partial<Omit<Restaurant, 'id'>> }): Promise<Restaurant> =>
  RestaurantSchema.findOneAndUpdate(filter, newData, { new: true });

export default {
  getRestaurant,
  updateRestaurantByFilter,
};
