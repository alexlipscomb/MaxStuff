const Max = require('max-api');

Max.addHandler("parse", (msg) => {
    var sequences = parseChains(msg);
    outputSequences(sequences);
});

function parseChains(chains) {
    chains = chains.split(";");
    var sequences = new Array();

    for (let i = 0; i < chains.length; i++) {
        chains[i] = chains[i].replace('\n', '');

        if (chains[i] === '') {
            continue;
        }

        var chainTarget = chains[i].split(':');

        var chainWeights = chainTarget[1].split('|');
        chainTarget = chainTarget[0];

        sequences.push([chainTarget, chainWeights]);
    }

    return sequences;
}

function outputSequences(sequences) {
    Max.outlet('clear');

    for (let i = 0; i < sequences.length; i++) {
        for (let j = 0; j < sequences[i][1].length; j++) {
            Max.outlet(`merge ${sequences[i][0]} ${sequences[i][1][j]}`);
        }
    }
}