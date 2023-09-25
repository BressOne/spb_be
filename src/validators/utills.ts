import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export type DataPathPart = string | number;
export type DataPath = Array<DataPathPart>;
export type ValidationSuccess<T> = { ok: true; value: T };
export type ValidationFailure = { ok: false; message: string; dataPath: DataPath };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;
export type DataPathParam = DataPath | DataPathPart;
export type FromExistingValidateFailure = { validationFailure: ValidationFailure; dataPath: DataPathParam };
export type Initial = { message: string; dataPath?: DataPathParam };
export type Props = Initial | FromExistingValidateFailure;

const isDataPath = (dataPathParam: DataPathParam): dataPathParam is DataPath => Array.isArray(dataPathParam);

const toDataPath = (dataPathParam: DataPathParam): DataPath =>
  isDataPath(dataPathParam) ? dataPathParam : [dataPathParam];

const isInitial = (props: Props): props is Initial => 'message' in props;

function validateFailure(props: Props): ValidationFailure {
  if (isInitial(props)) {
    return {
      ok: false,
      dataPath: props.dataPath === undefined || props.dataPath === '' ? [] : toDataPath(props.dataPath),
      message: props.message,
    };
  }
  return {
    ...props.validationFailure,
    dataPath: [
      ...(isDataPath(props.dataPath) ? props.dataPath : [props.dataPath]),
      ...props.validationFailure.dataPath,
    ],
  };
}
function validateSuccess<T>(data: T): ValidationSuccess<T> {
  return { ok: true, value: data };
}

const UNKNOWN_SCHEMA_VALIDATION_ERROR = 'Unknown Schema validation error';

const convertAjvDataPath = (ajvDataPath: string): DataPath => ajvDataPath.split('/').filter((str) => str !== '');

function validateBySchema<T>({ data, schema }: { data: unknown; schema: Object }): ValidationResult<T> {
  const ajv = new Ajv({ allowUnionTypes: true });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const firstError = validate.errors && validate.errors[0];
    return validateFailure(
      firstError
        ? {
            message: firstError.message || UNKNOWN_SCHEMA_VALIDATION_ERROR,
            dataPath: convertAjvDataPath(firstError.instancePath),
          }
        : { message: UNKNOWN_SCHEMA_VALIDATION_ERROR }
    );
  }
  return validateSuccess(data as T);
}

export default validateBySchema;
