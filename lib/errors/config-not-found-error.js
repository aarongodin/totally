
import { inherits } from 'util';

const ConfigNotFoundError = function (message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(ConfigNotFoundError, Error);

export default ConfigNotFoundError;
