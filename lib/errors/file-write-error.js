
import { inherits } from 'util';

const FileWriteError = function (message, extra) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.extra = extra;
};

inherits(FileWriteError, Error);

export default FileWriteError;
