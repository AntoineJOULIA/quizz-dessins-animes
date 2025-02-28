// eslint-disable-next-line
const fs = require("node:fs");
// eslint-disable-next-line
const Papa = require("papaparse");

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

let data = fs.readFileSync("../data/dessins-animes.csv", "utf8");
let result = Papa.parse(data, {
  header: true,
});

// Add hints, based on id
const animesWithHints = result.data.map((anime) => {
  return {
    ...anime,
    hardHint: `assets/images/${anime.id}-01.jpg`,
    easyHint: `assets/images/${anime.id}-02.jpg`,
  };
});

// Shuffle array
const shuffledAnimes = shuffle(animesWithHints);

// Add index property
const animes = shuffledAnimes.map((item, index) => {
  return {
    ...item,
    index: (index + 1).toString(),
  };
});

fs.writeFileSync("../data/dessins-animes.json", JSON.stringify(animes), "utf8");
// const sample = animes.slice(0, 10);
// fs.writeFileSync("../data/dessins-animes_sample10.json", JSON.stringify(sample), "utf8");
console.log("Conversion done");
