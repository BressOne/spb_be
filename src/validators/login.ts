import LoginBody from './schema-types/LoginBody';
import validateBySchema, { ValidationResult } from './utills';
import LoginBodySchema from './schemas/LoginBody.json';

// eslint-disable-next-line import/prefer-default-export
export function validateLoginBody(data: unknown): ValidationResult<LoginBody> {
  return validateBySchema<LoginBody>({ data, schema: LoginBodySchema });
}
