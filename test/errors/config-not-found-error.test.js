
import { expect } from 'chai';
import ConfigNotFoundError from '../../lib/errors/config-not-found-error';

describe('ConfigNotFoundError', () => {

	it('should have a name', () => {
		let e = new ConfigNotFoundError('config not found');
		expect(e.name).to.equal('ConfigNotFoundError');
	});

});
