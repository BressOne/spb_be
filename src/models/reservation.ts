import { Reservation } from '../types/db';
import ReservationSchema from '../schemas/reservation';

const getRestaurantReservation = async (filter: Record<string, unknown>): Promise<Reservation | null> =>
  ReservationSchema.findOne(filter).lean();
const getRestaurantReservations = async (filter: Record<string, unknown>): Promise<Reservation[]> =>
  ReservationSchema.find(filter).lean();
const updateRestaurantReservation = async (
  filter: Record<string, unknown>,
  newData: { $set?: Partial<Omit<Reservation, 'id'>> }
): Promise<Reservation> => ReservationSchema.findOneAndUpdate(filter, newData, { new: true });
const addRestaurantReservation = async (data: Reservation) => ReservationSchema.create(data);
const removeRestaurantReservationByFilter = async (
  filter: { id: string; tableId: string } & Record<string, unknown>
): Promise<void> => ReservationSchema.findOneAndDelete<void>(filter);
const removeRestaurantTableReservations = async (filter: { tableId: string }): Promise<void> =>
  ReservationSchema.findOneAndDelete<void>(filter);

export {
  getRestaurantReservation,
  getRestaurantReservations,
  addRestaurantReservation,
  updateRestaurantReservation,
  removeRestaurantReservationByFilter,
  removeRestaurantTableReservations,
};
