import AddTabeleBody from './schema-types/AddTabeleBody';
import AddTabeleParams from './schema-types/AddTabeleParams';
import GetTableParams from './schema-types/GetTableParams';
import GetTablesParams from './schema-types/GetTablesParams';
import RemoveTabeleParams from './schema-types/RemoveTabeleParams';
import validateBySchema, { ValidationResult } from './utills';
import GetTableParamsSchema from './schemas/GetTableParams.json';
import GetTablesParamsSchema from './schemas/GetTablesParams.json';
import AddTabeleBodySchema from './schemas/AddTabeleBody.json';
import AddTabeleParamsSchema from './schemas/AddTabeleParams.json';
import RemoveTabeleParamsSchema from './schemas/RemoveTabeleParams.json';

export function validateGetTableParams(data: unknown): ValidationResult<GetTableParams> {
  return validateBySchema<GetTableParams>({ data, schema: GetTableParamsSchema });
}
export function validateGetTablesParams(data: unknown): ValidationResult<GetTablesParams> {
  return validateBySchema<GetTablesParams>({ data, schema: GetTablesParamsSchema });
}
export function validateAddTabeleBody(data: unknown): ValidationResult<AddTabeleBody> {
  return validateBySchema<AddTabeleBody>({ data, schema: AddTabeleBodySchema });
}
export function validateAddTabeleParams(data: unknown): ValidationResult<AddTabeleParams> {
  return validateBySchema<AddTabeleParams>({ data, schema: AddTabeleParamsSchema });
}
export function validateRemoveTabeleParams(data: unknown): ValidationResult<RemoveTabeleParams> {
  return validateBySchema<RemoveTabeleParams>({ data, schema: RemoveTabeleParamsSchema });
}
