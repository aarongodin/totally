
import FetchError from './errors/fetch-error';
import fetch from 'node-fetch';

export function fetchJson (endpoint) {

  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((res) =>  {
        resolve(res.json());
      })
      .catch((e) => {
        reject(new FetchError('there was an error requesting the endpoint', { endpoint }));
      });
  });

}

export function mapConfToResults (conf) {

  let loadedItems = conf.map((item, itemIndex) => {
    return fetchJson(item.endpoint, itemIndex).then((json) => {
      item._result = json;
      return item;
    });
  });

  return Promise.all(loadedItems);

}
