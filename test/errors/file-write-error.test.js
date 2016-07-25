
import { expect } from 'chai';
import FileWriteError from '../../lib/errors/file-write-error';

describe('FileWriteError', () => {

  it('should have a name', () => {
    let e = new FileWriteError('error writing a file');
    expect(e.name).to.equal('FileWriteError');
  });

  it('should accept extra error data', () => {
    let e = new FileWriteError('error writing a scenario file', { itemIndex: 22 });
    expect(e.extra.itemIndex).to.equal(22);
  });

});
