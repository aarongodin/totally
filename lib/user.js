
import UserHandlerError from './errors/user-handler-error';

export function mapConfToUserHandler (conf) {

	return new Promise((resolve, reject) => {
		let mappedItems = conf.map((item, itemIndex) => {
			if (item.handler) {
				try {
					let handledResult = item.handler(item._result);

					if (!handledResult || typeof handledResult !== 'object') {
						return reject(new UserHandlerError('the handler function did not return an object', { itemIndex }));
					}

					item._result = handledResult;

				} catch (e) {
					reject(new UserHandlerError('there was an error processing using a handler', { itemIndex }));
				}
			}

			return item;
		});

		resolve(mappedItems);
	});

}
