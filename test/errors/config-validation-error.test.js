
import { expect } from 'chai';
import ConfigValidationError from '../../lib/errors/config-validation-error';

describe('ConfigValidationError', () => {

	it('should have a name', () => {
		let e = new ConfigValidationError('the conf is not valid');
		expect(e.name).to.equal('ConfigValidationError');
	});

	it('should accept extra error data', () => {
		let e = new ConfigValidationError('the conf is not valid', { itemIndex: 22 });
		expect(e.extra.itemIndex).to.equal(22);
	});

});
