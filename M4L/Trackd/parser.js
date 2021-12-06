const Max = require("max-api");

Max.addHandler("parse", (msg) => {
    sequences = msg.split(";");
    nestedSeqs = [];

    for (let i = 0; i < sequences.length; i++) {
        sequences[i] = sequences[i].replace(" ", "");
        sequences[i] = sequences[i].replace("\n", "");
        sequences[i] = sequences[i].split(":")
        sequences[i][0] = parseFloat(sequences[i][0]) * 480.;
    }
    sequences.splice(-1);

    for (let i = 0; i < sequences.length; i++) {
        sequences[i] = [sequences[i][0], sequences[i][1].split(",")];
    }

    Max.outlet("clear");
    for (let i = 0; i < sequences.length; i++) {
        for (let j = 0; j < sequences[i][1].length; j++) {
            Max.outlet("merge " + Math.round(sequences[i][0]) + " " + sequences[i][1][j]);
        }
    }
});