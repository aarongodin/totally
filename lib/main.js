
import { load, validate } from './config';
import { mapConfToResults } from './load';
import { mapConfToUserHandler } from './user';
import { mapConfToDiff } from './diff';
import { mapConfToFiles, mapConfToFilePaths } from './file';

export default function main () {

	return load()
		.then(validate)
		.then(mapConfToResults)
		.then(mapConfToUserHandler)
		.then(mapConfToFilePaths)
		.then(mapConfToDiff)
		.then(mapConfToFiles);

}
