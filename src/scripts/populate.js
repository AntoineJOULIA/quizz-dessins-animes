const fs = require("node:fs");
const Papa = require("papaparse");

fs.readFile("../data/dessins-animes.csv", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const result = Papa.parse(data, {
    header: true,
  });
  console.log(result.data);
});
