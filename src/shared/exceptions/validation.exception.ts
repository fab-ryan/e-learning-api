import { BadRequestException, ValidationError } from '@nestjs/common';

export const ValidationExceptionFactory = (errors: ValidationError[]) => {
  const formattedErrors = formatErrors(errors);
  return formattedErrors;
};

interface ValidationResponse {
  [key: string]: Record<string, unknown> | string[];
}
function formatErrors(errors: ValidationError[]): ValidationResponse {
  const errMsg = {};
  errors.forEach((error: ValidationError) => {
    errMsg[error.property] = error.children.length
      ? [formatErrors(error.children)]
      : [...Object.values(error.constraints)];
  });
  return errMsg;
}

export class ValidationException extends BadRequestException {
  constructor(public errors: ValidationResponse) {
    super(errors);
  }
}
