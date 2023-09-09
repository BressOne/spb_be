import { Reservation } from 'src/types/db';
import ReservationSchema from '../schemas/reservation';

const getReservation = async (filter: any): Promise<Reservation> => ReservationSchema.findOne(filter).lean();
const getReservations = async (filter: any): Promise<Reservation[]> => ReservationSchema.find(filter).lean();
const updateReservation = async (
  filter: any,
  newData: { $set?: Partial<Omit<Reservation, 'id'>> }
): Promise<Reservation> => ReservationSchema.findOneAndUpdate(filter, newData, { new: true });
const addReservation = async (data: Reservation) => ReservationSchema.create(data);
const removeReservationById = async (id: string): Promise<void> => ReservationSchema.findOneAndDelete<void>({ id });

export default {
  getReservation,
  getReservations,
  addReservation,
  updateReservation,
  removeReservationById,
};
