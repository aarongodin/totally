
import { inherits } from 'util';

const ConfigValidationError = function (message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(ConfigValidationError, Error);

export default ConfigValidationError;
