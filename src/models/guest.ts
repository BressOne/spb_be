import { Guest } from 'src/types/db';
import GuestSchema from '../schemas/guest';

const getGuest = async (filter: any): Promise<Guest> => GuestSchema.findOne(filter).lean();
const addGuest = async (data: Guest) => GuestSchema.create(data);

export default {
  getGuest,
  addGuest,
};
