const Max = require('max-api');

Max.addHandler('dict', (storedNotesDictId) => {
	parseDict(storedNotesDictId);
});


async function parseDict(dictId) {
	const storedNotes = await Max.getDict(dictId);
	const numKeys = storedNotes['numKeys'];
	const length = storedNotes['length'];
	const divisions = storedNotes['divisions'];

	var newSequence = {};

	try {
		let div = length / divisions;

		// The current division
		for (let i = 0; i < divisions; i++) {
			let startPoint = ((i / divisions) * length);
			let chosenIndex = choose(storedNotes['weights']);
			let chosenSequence = storedNotes[chosenIndex]['steps'];

			// Ticks per division
			for (let j = startPoint; j < div + startPoint; j++) {
				if (chosenSequence[j]) {
					newSequence[j] = chosenSequence[j];
				}
			}
		}

		Max.outlet(newSequence);
	} catch (error) {
		Max.post("Something went wrong.");
	}
}


function choose(weights) {
	var weighted = [];
	var maxValue = 0;
	var maxIndex = 0;

	for (let i = 0; i < weights.length; i++) {
		weighted.push(Math.random() * weights[i]);
	}

	for (let i = 0; i < weighted.length; i++) {
		if (weighted[i] > maxValue) {
			maxIndex = i;
			maxValue = weighted[i];
		}
	}

	return maxIndex;
}


