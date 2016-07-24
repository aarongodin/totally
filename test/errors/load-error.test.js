
import { expect } from 'chai';
import LoadError from '../../lib/errors/load-error';

describe('LoadError', () => {

	it('should have a name', () => {
		let e = new LoadError('error loading an endpoint');
		expect(e.name).to.equal('LoadError');
	});

	it('should accept extra error data', () => {
		let e = new LoadError('error loading an endpiont', { itemIndex: 22 });
		expect(e.extra.itemIndex).to.equal(22);
	});

});
