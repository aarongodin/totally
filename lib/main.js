
import { load, validate } from './config';
import { mapConfToResults } from './load';
import { mapConfToUserHandler } from './user';
import { mapConfToFiles } from './file';
import { mapConfToOutput } from './cli';

export default function main () {

	return load()
		.then(validate)
		.then(mapConfToResults)
		.then(mapConfToUserHandler)
		.then(mapConfToFiles)

}
