
import path from 'path';
import { exists, writeFile } from 'fs';
import thenify from 'thenify';
import FileWriteError from './errors/file-write-error';

const writeFilePromise = thenify(writeFile);

const cwd = process.cwd();

function itemToFile (item, itemIndex) {

	let pathToWrite = item.filePath;

	if (!path.isAbsolute(pathToWrite)) {
		pathToWrite = path.resolve(cwd, pathToWrite);
	}

	if (path.extname(pathToWrite) !== '.json') {
		let parsed = path.parse(pathToWrite);
		pathToWrite = `${parsed.dir}/${parsed.name}.json`;
	}

	item._path = pathToWrite;

	return new Promise(function (resolve, reject) {

		exists(pathToWrite, (fileExists) => {
			item._fileStatus = fileExists ? 'modified' : 'created';

			let fileBody = JSON.stringify(item._result, null, 2);

			writeFilePromise(pathToWrite, fileBody)
				.then(() => {
					resolve(item);
				})
				.catch((e) => {
					reject(new FileWriteError('there was an error writing a file', { itemIndex }));
				});
		});

	});

}

export function mapConfToFiles (conf) {

	let allItems = conf.map(itemToFile);
	return Promise.all(allItems);

}
