
import { expect } from 'chai';
import mockery from 'mockery';
import * as config from '../lib/config';
import conf from './mockdata/conf';

const cwd = process.cwd();

describe('config', () => {

  beforeEach(() => {
    mockery.enable({ warnOnUnregistered: false });
  });

  afterEach(() => {
    mockery.disable();
  });

  describe('load', () => {
    context('given a configuration file exists', () => {
      beforeEach(() => {
        mockery.registerMock(`${cwd}/totally`, conf);
      });

      afterEach(() => {
        mockery.deregisterMock(`${cwd}/totally`);
      });

      it('should resolve the configuration', (done) => {
        config.load()
          .then((result) => {
            expect(result).to.equal(conf);
            done();
          }).catch(done);
      });
    });

    context('given a configuration file does not exist', () => {
      it('should reject with an error', (done) => {
        config.load()
          .then((conf) => done(new Error()))
          .catch((e) => {
            expect(e.name).to.equal('ConfigNotFoundError');
            done();
          });
      });
    });
  });

  describe('validate', () => {

    context('given a conf that is not an array', () => {
      it('should reject with a validation error', (done) => {
        config.validate({})
          .then((conf) => done(new Error()))
          .catch((e) => {
            expect(e.name).to.equal('ConfigValidationError');
            expect(e.message).to.equal('totally.js must export an array');
            done();
          });
      });
    });

    context('when validating individual items', () => {
      context('and an item is not an object', () => {
        it('should reject with a validation error', (done) => {
          config.validate(['not-an-object'])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('an item in your configuration is not an object');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and filePath is not defined', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{}])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('filePath must be defined for each item');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and the filePath is not a string', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{ filePath: 1 }])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('filePath must be a string');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and endpoint is not defined', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{ filePath: 'test' }])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('endpoint must be defined for each item');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and endpoint is not a string', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{ filePath: 'test', endpoint: 1 }])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('endpoint must be a string');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and excludeFromDiff is defined but not a valid type', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{ filePath: 'test', endpoint: 'test', excludeFromDiff: {} }])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('excludeFrom Diff must be a string or array of strings');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });

      context('and excludeFromDiff is defined but includes an item that is not a string', () => {
        it('should reject with a validation error', (done) => {
          config.validate([{ filePath: 'test', endpoint: 'test', excludeFromDiff: [{}] }])
            .then((conf) => done(new Error()))
            .catch((e) => {
              expect(e.name).to.equal('ConfigValidationError');
              expect(e.message).to.equal('excludeFromDiff must only contain strings');
              expect(e.extra.itemIndex).to.equal(0);
              done();
            });
        });
      });
    });

  });

});
