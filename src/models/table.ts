import { ObjectId, Document } from 'mongoose';
import { Table } from 'src/types/db';
import TableSchema from '../schemas/table';

const getRestaurantTable = async (filter: any, restaurantId: string): Promise<Document<ObjectId, any, Table>> =>
  TableSchema.findOne(filter).populate({ path: 'restaurant', match: { id: restaurantId }, select: 'id' });
const getRestaurantTables = async (filter: any, restaurantId: string): Promise<Document<ObjectId, any, Table>[]> =>
  TableSchema.find(filter).populate({ path: 'restaurant', match: { id: restaurantId }, select: 'id' });
const addRestaurantTable = async ({ id, restaurantObjectId }: { id: string; restaurantObjectId: ObjectId }) =>
  new TableSchema({ id, restaurant: restaurantObjectId }).save();

export default {
  getRestaurantTable,
  getRestaurantTables,
  addRestaurantTable,
};
