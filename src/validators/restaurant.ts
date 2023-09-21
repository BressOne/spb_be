import GetRestaurantParams from './schema-types/GetRestaurantParams';
import UpdateRestaurantBody from './schema-types/UpdateRestaurantBody';
import UpdateRestaurantParams from './schema-types/UpdateRestaurantParams';
import validateBySchema, { ValidationResult } from './utills';
import GetRestaurantParamsSchema from './schemas/GetRestaurantParams.json';
import UpdateRestaurantBodySchema from './schemas/UpdateRestaurantBody.json';
import UpdateRestaurantParamsSchema from './schemas/UpdateRestaurantParams.json';

export function validateGetRestaurantParams(data: unknown): ValidationResult<GetRestaurantParams> {
  return validateBySchema<GetRestaurantParams>({ data, schema: GetRestaurantParamsSchema });
}
export function validateUpdateRestaurantParams(data: unknown): ValidationResult<UpdateRestaurantParams> {
  return validateBySchema<UpdateRestaurantParams>({ data, schema: UpdateRestaurantParamsSchema });
}
export function validateUpdateRestaurantBody(data: unknown): ValidationResult<UpdateRestaurantBody> {
  return validateBySchema<UpdateRestaurantBody>({ data, schema: UpdateRestaurantBodySchema });
}
