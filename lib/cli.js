
import p from 'pluralize';

function pif (word, count) {
	return count === 1 ? word : p(word);
}

export function mapConfToOutput (conf) {

	let created = conf.filter(item => item._fileStatus === 'created');
	let modified = conf.filter(item => item._fileStatus === 'modified');

	return { created, modified };

}

export function logOutput (output) {

	if (output.created && output.created.length > 0) {
		console.log(`created ${output.created.length} ${pif('file', output.created.length)}:`);

		output.created.forEach((createdItem) => {
			console.log(`  ${createdItem._path}`);
		});
	}

	if (output.modified && output.modified.length > 0) {
		console.log(`modified ${output.modified.length} ${pif('file', output.modified.length)}:`);

		output.modified.forEach((modifiedItem) => {
			console.log(`  ${modifiedItem._path}`);
		});
	}

}
