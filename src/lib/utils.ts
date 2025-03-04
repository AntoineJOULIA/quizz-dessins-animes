import { Anime } from "@/types";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 *
 * @param str : chaîne de caractères à normaliser, contenant des caractères accentués
 * @returns chaines de caractères normalisée, sans accents, en minuscules et sans espaces inutiles
 */
function normalize(str: string) {
  const normalized = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return normalized;
}

export function checkAnswer(anime: Anime, answer: string) {
  const normalizedAnswer = normalize(answer);
  const success = anime.acceptedAnswers.some((acceptedAnswer) => {
    return acceptedAnswer.toLowerCase().trim() === normalizedAnswer;
  });
  return success;
}

export function youtubeUrlToEmbed(youtubeUrl: string) {
  return youtubeUrl.replace("/watch?v=", "/embed/");
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
