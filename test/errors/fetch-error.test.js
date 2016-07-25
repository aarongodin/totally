
import { expect } from 'chai';
import FetchError from '../../lib/errors/fetch-error';

describe('FetchError', () => {

  it('should have a name', () => {
    let e = new FetchError('error loading an endpoint');
    expect(e.name).to.equal('FetchError');
  });

  it('should accept extra error data', () => {
    let e = new FetchError('error loading an endpiont', { itemIndex: 22 });
    expect(e.extra.itemIndex).to.equal(22);
  });

});
