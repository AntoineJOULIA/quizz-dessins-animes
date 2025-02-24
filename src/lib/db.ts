import { Anime } from "@/types";
import rawData from "../data/dessins-animes.json";

const data = rawData as Anime[];

export function getAnimes() {
  return data;
}

export function getAnime(id: string) {
  return data.find((anime) => anime.id === id);
}
