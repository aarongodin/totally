
import { inherits } from 'util';

const LoadError = function (message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(LoadError, Error);

export default LoadError;
