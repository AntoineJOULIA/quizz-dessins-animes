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

// Transforms acceptedAnswers string in string[]
const animesWithConvertedAcceptedAnswers = shuffledAnimes.map((anime) => {
  if (!anime.acceptedAnswers) return { ...anime, acceptedAnswers: [] };

  let answers = anime.acceptedAnswers.split(",");
  answers = answers.map((val) => val.trim());
  return {
    ...anime,
    acceptedAnswers: answers,
  };
});

// fs.writeFileSync("../data/dessins-animes.json", JSON.stringify(finalAnimes), "utf8");
// const sample = finalAnimes.filter((anime) => anime.acceptedAnswers.length > 1).slice(0, 3);
const sample = animesWithConvertedAcceptedAnswers.filter((anime) => hasImage(anime.id));

// Add index property
const animes = sample.map((item, index) => {
  return {
    ...item,
    index: (index + 1).toString(),
  };
});
fs.writeFileSync("../data/dessins-animes_sample.json", JSON.stringify(animes), "utf8");
console.log("Conversion done");

function hasImage(id) {
  const imagePath = `../../public/assets/images/${id}-01.jpg`;
  return fs.existsSync(imagePath);
}
