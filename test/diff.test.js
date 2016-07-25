
import { expect } from 'chai';
import mockfs from 'mock-fs';

let filePath = `${process.cwd()}/test.json`;
let mockObject;

import * as diff from '../lib/diff';

describe('diff', () => {

  beforeEach(() => {
    mockObject = {};
    mockObject[filePath] = JSON.stringify({ boop: 'Test' });
    mockfs(mockObject);
  });

  afterEach(() => {
    mockfs.restore();
  });

  describe('mapConfToDiff', () => {
    context('given a file does not exists', () => {
      it('should mark _diff as true', (done) => {
        let conf = [{
          filePath: 'not-a-file',
          endpoint: 'test',
          _path: 'not-a-file',
          _result: { boop: 'Test' }
        }];

        diff.mapConfToDiff(conf)
          .then((result) => {
            expect(result[0]._diff).to.be.true;
            done();
          })
          .catch(done);
      });
    });

    context('given a file exists', () => {
      context('and _result is the same as the current data', () => {
        it('should mark _diff as false', (done) => {
          let conf = [{
            filePath: 'test',
            endpoint: 'test',
            _path: filePath,
            _result: { boop: 'Test' }
          }];

          diff.mapConfToDiff(conf)
            .then((result) => {
              expect(result[0]._diff).to.be.false;
              done();
            })
            .catch(done);
        });
      });

      context('and _result is not the same as the current data', () => {
        it('should mark _diff as true', (done) => {
          let conf = [{
            filePath: 'test',
            endpoint: 'test',
            _path: filePath,
            _result: { boop: 'Test2' }
          }];

          diff.mapConfToDiff(conf)
            .then((result) => {
              expect(result[0]._diff).to.be.true;
              done();
            })
            .catch(done);
        });
      });

      context('and excludeFromDiff is set', () => {
        context('and the changed properties are excluded', () => {
          it('should set _diff to false', (done) => {
            let conf = [{
              filePath: 'test',
              endpoint: 'test',
              _path: filePath,
              _result: { boop: 'Test' },
              excludeFromDiff: 'boop'
            }];

            diff.mapConfToDiff(conf)
              .then((result) => {
                expect(result[0]._diff).to.be.false;
                done();
              })
              .catch(done);
          });
        });

        context('and there are still changed properties', () => {
          it('should set _diff to true', (done) => {
            let conf = [{
              filePath: 'test',
              endpoint: 'test',
              _path: filePath,
              _result: { boop: 'Test', example: 'New prop' },
              excludeFromDiff: 'boop'
            }];

            diff.mapConfToDiff(conf)
              .then((result) => {
                expect(result[0]._diff).to.be.true;
                done();
              })
              .catch(done);
          });
        });
      });
    });
  });

});
