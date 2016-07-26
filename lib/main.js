
import * as conf from './config';
import { mapConfToResults } from './retrieve';
import { mapConfToUserHandler } from './user';
import { mapConfToDiff } from './diff';
import { mapConfToSchemaValidation } from './schema';
import { mapConfToFiles, mapConfToFilePaths } from './file';

export default function main () {

  return conf.load()
    .then(conf.validate)
    .then(mapConfToResults)
    .then(mapConfToUserHandler)
    .then(mapConfToSchemaValidation)
    .then(mapConfToFilePaths)
    .then(mapConfToDiff)
    .then(mapConfToFiles);

}
