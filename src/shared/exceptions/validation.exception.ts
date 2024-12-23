import { BadRequestException, ValidationError } from '@nestjs/common';

export const ValidationExceptionFactory = (errors: ValidationError[]) => {
  const formattedErrors = formatErrors(errors);
  return new ValidationException(formattedErrors);
};

interface ValidationResponse {
  [key: string]: string[] | ValidationResponse;
}
function formatErrors(
  errors: ValidationError[],
  seen = new WeakSet<ValidationError>(),
): ValidationResponse {
  const errorResponse: ValidationResponse = {};
  errors.forEach((error: ValidationError) => {
    if (seen.has(error)) {
      return;
    }
    seen.add(error);
    if (error.constraints) {
      // Standard validation errors
      errorResponse[error.property] = Object.values(error.constraints);
    } else if (error.children && error.children.length > 0) {
      // Nested errors
      errorResponse[error.property] = formatErrors(error.children);
    } else {
      errorResponse[error.property] = ['Unknown validation error'];
    }
  });
  return errorResponse;
}

export class ValidationException extends BadRequestException {
  constructor(public errors: ValidationResponse) {
    super(errors);
  }
}
