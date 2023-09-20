import { User } from '../types/db';
import UserSchema from '../schemas/user';

const getUser = async (filter: Record<string, unknown>): Promise<User | null> => UserSchema.findOne(filter);
const addUser = async (data: User) => UserSchema.create(data);

export { getUser, addUser };
