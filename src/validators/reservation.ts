import GetReservationsParams from './schema-types/GetReservationsParams';
import RemoveReservationParams from './schema-types/RemoveReservationParams';
import AddReservationParams from './schema-types/AddReservationParams';
import AddReservationBody from './schema-types/AddReservationBody';
import validateBySchema, { ValidationResult } from './utills';
import GetReservationsParamsSchema from './schemas/GetReservationsParams.json';
import RemoveReservationParamsSchema from './schemas/RemoveReservationParams.json';
import AddReservationParamsSchema from './schemas/AddReservationParams.json';
import AddReservationBodySchema from './schemas/AddReservationBody.json';
import { Restaurant, week } from '../types/db';
import { WorkingHours } from './schema-types/UpdateRestaurantBody';

export function validateGetReservationsParams(data: unknown): ValidationResult<GetReservationsParams> {
  return validateBySchema<GetReservationsParams>({ data, schema: GetReservationsParamsSchema });
}
export function validateRemoveReservationParams(data: unknown): ValidationResult<RemoveReservationParams> {
  return validateBySchema<RemoveReservationParams>({ data, schema: RemoveReservationParamsSchema });
}
export function validateAddReservationParams(data: unknown): ValidationResult<AddReservationParams> {
  return validateBySchema<AddReservationParams>({ data, schema: AddReservationParamsSchema });
}
export function validateAddReservationBody(data: unknown): ValidationResult<AddReservationBody> {
  return validateBySchema<AddReservationBody>({ data, schema: AddReservationBodySchema });
}

export function validateReservationTime({
  restaurant,
  reservation: { startTime, endTime },
}: {
  restaurant: Restaurant;
  reservation: { startTime: string | Date; endTime: string | Date };
}): boolean {
  const getRestaurantsWorkingHours = (day: Date, restaurantworkingHours: WorkingHours) => {
    const dayIndex = day.getDay();
    const dayName = week[dayIndex];
    return restaurantworkingHours[dayName];
  };

  const { start, end } = getRestaurantsWorkingHours(new Date(startTime), restaurant.workingHours);

  const hhmmReservationTimeStart = new Date(startTime).getUTCHours() * 100 + new Date(startTime).getUTCMinutes();
  const hhmmReservationTimeEnd = new Date(endTime).getUTCHours() * 100 + new Date(startTime).getUTCMinutes();
  const hhmmRestaurantStart = Number.parseInt(start.split(':').join(''), 10);
  const hhmmRestaurantEnd = Number.parseInt(end.split(':').join(''), 10);

  return (
    hhmmReservationTimeStart < hhmmRestaurantEnd &&
    hhmmReservationTimeStart >= hhmmRestaurantStart &&
    hhmmReservationTimeEnd > hhmmReservationTimeStart &&
    hhmmReservationTimeEnd <= hhmmRestaurantEnd
  );
}
