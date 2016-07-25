
import { inherits } from 'util';

const FetchError = function (message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(FetchError, Error);

export default FetchError;
