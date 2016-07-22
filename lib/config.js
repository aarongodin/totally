
import ConfigValidationError from './errors/config-validation-error';
import ConfigNotFoundError from './errors/config-not-found-error';
import grab from 'lodash.get';

const cwd = process.cwd();

export function load () {

	return new Promise((resolve, reject) => {
		let conf;

		try {
			conf = require(`${cwd}/totally`);
			resolve(conf);
		} catch (e) {
			if (e.code === 'MODULE_NOT_FOUND') {
				reject(new ConfigNotFoundError());
			} else {
				reject(e);
			}
		}
	});

}

function validateConfig (conf) {
	if (!Array.isArray(conf)) {
		throw new ConfigValidationError('reefy.config.js must export an array');
	}
}

function validateItem (item, itemIndex) {

	if (typeof item !== 'object') {
		throw new ConfigValidationError('an item in your configuration is not an object', { itemIndex });
	}

	if (!grab(item, 'filePath')) {
		throw new ConfigValidationError('filePath must be defined for each item', { itemIndex });
	}

	if (typeof grab(item, 'filePath') !== 'string') {
		throw new ConfigValidationError('filePath must be a string', { itemIndex });
	}

	if (!grab(item, 'endpoint')) {
		throw new ConfigValidationError('endpoint must be defined for each item', { itemIndex });
	}

	if (typeof grab(item, 'endpoint') !== 'string') {
		throw new ConfigValidationError('endpoint must be a string', { itemIndex });
	}

	let handler = grab(item, 'handler');

	if (handler && typeof handler !== 'function') {
		throw new ConfigValidationError('handler must be a function', { itemIndex });
	}

	let excludeFromDiff = grab(item, 'excludeFromDiff');

	if (excludeFromDiff && !(Array.isArray(excludeFromDiff) || typeof excludeFromDiff === 'string')) {
		throw new ConfigValidationError('excludeFrom Diff must be a string or array of strings', { itemIndex });
	}

	if (Array.isArray(excludeFromDiff) && !excludeFromDiff.every(diff => typeof diff === 'string')) {
		throw new ConfigValidationError('excludeFromDiff must only contain strings', { itemIndex });
	}

}

export function validate (conf) {

	return new Promise((resolve, reject) => {
		try {
			validateConfig(conf);
			conf.forEach(validateItem);
			resolve(conf);
		} catch (e) {
			reject(e);
		}
	});

}

export default { load, validate };
