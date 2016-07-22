
export function mapConfToDiff (conf) {

	let allItems = conf.map((item) => {
		if (!item._result) {
			return Promise.resolve(item);
		}

		
	});

	return Promise.all(allItems);

}
