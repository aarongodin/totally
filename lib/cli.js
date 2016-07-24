
import p from 'pluralize';

function pif (word, count) {
	return count === 1 ? word : p(word);
}

export function mapConfToOutput (conf) {

	let created = conf.filter(item => item._fileStatus === 'created');
	let modified = conf.filter(item => item._fileStatus === 'modified');
	let skipped = conf.filter(item => item._fileStatus === 'skipped');

	return { created, modified, skipped };

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

	if (output.skipped && output.skipped.length > 0) {
		console.log(`skipped ${output.skipped.length} ${pif('file', output.skipped.length)}:`);

		output.created.forEach((skippedItem) => {
			console.log(`  ${skippedItem._path}`);
		});
	}

}
