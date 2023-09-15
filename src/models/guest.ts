import { Guest } from '../types/db';
import GuestSchema from '../schemas/guest';
import { Document, ObjectId } from 'mongoose';

const getGuest = async (filter: any): Promise<Document<ObjectId, any, Guest> | null> => GuestSchema.findOne(filter);
const addGuest = async (data: Guest) => GuestSchema.create(data);

export { getGuest, addGuest };
