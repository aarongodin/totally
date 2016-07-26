
import { inherits } from 'util';

const SchemaReadError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

inherits(SchemaReadError, Error);

export default SchemaReadError;
