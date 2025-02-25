"use client";

import { useAnswers } from "@/hooks/useAnswers";
import { Anime } from "@/types";
import Link from "next/link";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const { correctAnswers } = useAnswers();

  return (
    <div className="grid gap-4">
      {animes.map((anime) => (
        <div key={anime.id} className="bg-white p-4 rounded-lg shadow-md">
          <Link href={`/${anime.id}`} className="flex gap-4">
            <h2 className="text-xl font-semibold">{anime.id}</h2>
            <h2 className="text-xl font-semibold">{correctAnswers.includes(anime.id) ? anime.title : ""}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
