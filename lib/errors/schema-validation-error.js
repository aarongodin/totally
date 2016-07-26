
import { inherits } from 'util';

const SchemaValidationError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

inherits(SchemaValidationError, Error);

export default SchemaValidationError;
