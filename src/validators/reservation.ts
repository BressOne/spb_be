import GetReservationsParams from './schema-types/GetReservationsParams';
import RemoveReservationParams from './schema-types/RemoveReservationParams';
import AddReservationParams from './schema-types/AddReservationParams';
import AddReservationBody from './schema-types/AddReservationBody';
import validateBySchema, { ValidationResult } from './utills';
import GetReservationsParamsSchema from './schemas/GetReservationsParams.json';
import RemoveReservationParamsSchema from './schemas/RemoveReservationParams.json';
import AddReservationParamsSchema from './schemas/AddReservationParams.json';
import AddReservationBodySchema from './schemas/AddReservationBody.json';

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
