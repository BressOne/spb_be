import { ObjectId } from 'mongoose';
import { Reservation } from 'src/types/db';
import ReservationSchema from '../schemas/reservation';

const getRestaurantReservation = async (filter: any): Promise<Reservation | null> =>
  ReservationSchema.findOne(filter).lean();
const getRestaurantReservations = async (filter: any, restaurantId: string): Promise<Reservation[]> =>
  ReservationSchema.find(filter).populate({ path: 'restaurant', match: { id: restaurantId }, select: 'id' });
const updateRestaurantReservation = async (
  filter: any,
  newData: { $set?: Partial<Omit<Reservation, 'id'>> }
): Promise<Reservation> => ReservationSchema.findOneAndUpdate(filter, newData, { new: true });
const addRestaurantReservation = async (data: Reservation<ObjectId, ObjectId>) =>
  await new ReservationSchema(data).save();
const removeRestaurantReservationById = async (id: string): Promise<void> =>
  ReservationSchema.findOneAndDelete<void>({ id });

export {
  getRestaurantReservation,
  getRestaurantReservations,
  addRestaurantReservation,
  updateRestaurantReservation,
  removeRestaurantReservationById,
};
