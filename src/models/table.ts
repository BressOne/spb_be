import { ObjectId } from 'mongoose';
import { Table } from 'src/types/db';
import TableSchema from '../schemas/table';

const getTable = async (filter: any): Promise<Table> => TableSchema.findOne(filter).lean();
const addTable = async (data: { id: string; restaurant: ObjectId }) => TableSchema.create(data);

export default {
  getTable,
  addTable,
};
