
import FetchError from './errors/fetch-error';
import fetch from 'node-fetch';

export function getJson (item, itemIndex) {

	return new Promise((resolve, reject) => {
		fetch(item.endpoint)
			.then((res) =>  {
				resolve(res.json());
			})
			.catch((e) => {
				reject(new FetchError('there was an error requesting the endpoint', { itemIndex }));
			});
	});

}

export function mapConfToResults (conf) {

	let loadedItems = conf.map((item, itemIndex) => {
		return getJson(item, itemIndex).then((json) => {
			item._result = json;
			return item;
		});
	});

	return Promise.all(loadedItems);

}
