import { Table } from '../types/db';
import TableSchema from '../schemas/table';

const getRestaurantTable = async (filter: any, restaurantId: string): Promise<Table | null> =>
  TableSchema.findOne({ ...filter, restaurantId });
const getRestaurantTables = async (filter: any, restaurantId: string): Promise<Table[]> =>
  TableSchema.find({ ...filter, restaurantId });
const addRestaurantTable = async (data: Table) => await TableSchema.create(data);
const removeRestaurantTable = async (id: string) => TableSchema.findOneAndDelete({ id });

export { getRestaurantTable, getRestaurantTables, addRestaurantTable, removeRestaurantTable };
