
import path from 'path';
import { exists, writeFile } from 'fs';
import mkdirp from 'mkdirp';
import thenify from 'thenify';
import FileWriteError from './errors/file-write-error';

const writeFilePromise = thenify(writeFile);
const mkdirpPromise = thenify(mkdirp);
const cwd = process.cwd();

export function pathToAbsolute (filePath) {

  let realPath = filePath;

  if (!path.isAbsolute(realPath)) {
    realPath = path.resolve(cwd, realPath);
  }

  if (path.extname(realPath) !== '.json') {
    let parsed = path.parse(realPath);
    realPath = `${parsed.dir}/${parsed.name}.json`;
  }

  return realPath;

}

function itemToFile (item, itemIndex) {

  if (!item._diff) {
    item._fileStatus = 'skipped';
    return Promise.resolve(item);
  }

  return new Promise(function (resolve, reject) {

    exists(item._path, (fileExists) => {
      item._fileStatus = fileExists ? 'modified' : 'created';
      let fileBody = JSON.stringify(item._result, null, 2);

      mkdirpPromise(path.dirname(item._path))
        .then(() => writeFilePromise(item._path, fileBody))
        .then(() => {
          resolve(item);
        })
        .catch((e) => {
          reject(new FileWriteError('there was an error writing a file', { itemIndex }));
        });

    });

  });

}

export function mapConfToFilePaths (conf) {

  let allItems = conf.map((item, itemIndex) => {
    item._path = pathToAbsolute(item.filePath);
    return Promise.resolve(item);
  });

  return Promise.all(allItems);

}

export function mapConfToFiles (conf) {

  let allItems = conf.map(itemToFile);
  return Promise.all(allItems);

}
