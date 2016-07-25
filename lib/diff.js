
import unset from 'lodash.unset';
import thenify from 'thenify';
import { readFile } from 'fs';
import diff from 'deep-diff';

const readFilePromise = thenify(readFile);

function itemToDiff (item, itemIndex) {

  return new Promise((resolve, reject) => {
    return readFilePromise(item._path)
      .then((fileBuffer) => {
        let body = fileBuffer.toString();
        let current = JSON.parse(body);
        let comparison = compare(item, current);

        item._diff = comparison;

        resolve(item);
      })
      .catch((e) => {
        if (e.code === 'ENOENT') {
          item._diff = true;
          resolve(item);
        } else {
          reject(e);
        }
      });
  });

}

function compare (item, currentObj) {

  let newObj = JSON.parse(JSON.stringify(item._result));

  if (item.excludeFromDiff) {
    item.excludeFromDiff.forEach(function (excludePath) {
      unset(currentObj, excludePath);
      unset(newObj, excludePath);
    });
  }

  let differences = diff(currentObj, newObj);
  return differences !== undefined;

}

export function mapConfToDiff (conf) {

  let allItems = conf.map(itemToDiff);
  return Promise.all(allItems);

}
