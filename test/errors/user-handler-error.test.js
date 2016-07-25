
import { expect } from 'chai';
import UserHandlerError from '../../lib/errors/user-handler-error';

describe('UserHandlerError', () => {

  it('should have a name', () => {
    let e = new UserHandlerError('error running a handler function');
    expect(e.name).to.equal('UserHandlerError');
  });

  it('should accept extra error data', () => {
    let e = new UserHandlerError('error running a handler function', { itemIndex: 22 });
    expect(e.extra.itemIndex).to.equal(22);
  });

});
