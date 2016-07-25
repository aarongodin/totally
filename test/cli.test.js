
import { expect } from 'chai';
import * as cli from '../lib/cli';

import conf from './mockdata/conf';

describe('cli', () => {

	let mock;

	beforeEach(() => {
		mock = JSON.parse(JSON.stringify(conf));
	});

	describe('mapConfToOutput', () => {
		it('should create keys for each file status', () => {
			let output = cli.mapConfToOutput(mock);
			expect(output).to.have.keys('created', 'modified', 'skipped');
		});

		it('should create arrays for each file status', () => {
			let output = cli.mapConfToOutput(mock);
			expect(output.created).to.be.an('array');
			expect(output.modified).to.be.an('array');
			expect(output.skipped).to.be.an('array');
		});

		context('given a created file status', () => {
			it('should include one item in the created array', () => {
				mock[0]._fileStatus = 'created';
				let output = cli.mapConfToOutput(mock);
				expect(output.created[0]._fileStatus).to.equal('created');
			});
		});

		context('given a modified file status', () => {
			it('should include one item in the modified array', () => {
				mock[0]._fileStatus = 'modified';
				let output = cli.mapConfToOutput(mock);
				expect(output.modified[0]._fileStatus).to.equal('modified');
			});
		});

		context('given a skipped file status', () => {
			it('should include one item in the skipped array', () => {
				mock[0]._fileStatus = 'skipped';
				let output = cli.mapConfToOutput(mock);
				expect(output.skipped[0]._fileStatus).to.equal('skipped');
			});
		});
	});

});
