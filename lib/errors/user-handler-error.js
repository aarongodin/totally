
import { inherits } from 'util';

const UserHandlerError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

inherits(UserHandlerError, Error);

export default UserHandlerError;
