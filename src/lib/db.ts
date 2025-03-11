import { Anime } from "@/types";
// import rawData from "../data/dessins-animes.json";
// import rawData from "../data/dessins-animes_sample10.json";
import rawData from "../data/dessins-animes_sample.json";

const data = rawData as Anime[];

export function getAnimes() {
  return data;
}

export function getAnime(index: string) {
  return data.find((anime) => anime.index === index);
}
