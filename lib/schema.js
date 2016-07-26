
import thenify from 'thenify';
import SchemaReadError from './errors/schema-read-error';
import SchemaValidationError from './errors/schema-validation-error';
import jsonSchema from 'jsonschema';
import { readFile } from 'fs';
import { fetchJson } from './retrieve';
import { pathToAbsolute } from './file';

const readFilePromise = thenify(readFile);

function loadSchema (location) {
  if (location.match(/^http.*/) !== null) {
    return fetchJson(location);
  }

  return loadSchemaFile(location);
}

function loadSchemaFile (path) {
  let realPath = pathToAbsolute(path);

  return readFilePromise(realPath)
    .then((fileBuffer) => {
      let body = fileBuffer.toString();
      let schema = JSON.parse(body);
      return schema;
    })
    .catch((e) => {
      if (e.code === 'ENOENT') {
        throw new SchemaReadError('the specified schema file was not found', { realPath });
      } else {
        throw e;
      }
    });
}

function validateItemSchema (item, itemIndex) {

  if (item.validate === undefined) {
    return Promise.resolve(item);
  }

  return loadSchema(item.validate)
    .then((schema) => {
      let validation = jsonSchema.validate(item._result, schema);

      if (validation.errors.length > 0) {
        throw new SchemaValidationError('the result does not pass schema validation', { itemIndex, validation });
      }

      return item;
    });

}

export function mapConfToSchemaValidation (conf) {

  return Promise.all(conf.map(validateItemSchema));

}
