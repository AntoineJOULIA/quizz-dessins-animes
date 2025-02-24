import { Anime } from "@/types";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkAnswer(anime: Anime, answer: string) {
  const normalizedAnswer = answer.toLowerCase().trim();
  const success = anime.acceptedAnswers.some((acceptedAnswer) => {
    return acceptedAnswer.toLowerCase().trim() === normalizedAnswer;
  });
  return success;
}
