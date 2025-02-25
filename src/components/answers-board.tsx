"use client";

import { Anime } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const [foundAnimeIds, setFoundAnimeIds] = useState<string[]>([]);

  useEffect(() => {
    const storedAnimeIds = window.localStorage.getItem("quizz-anime");
    if (storedAnimeIds) {
      setFoundAnimeIds(storedAnimeIds.split(","));
    }
  }, []);

  return (
    <div className="grid gap-4">
      {animes.map((anime) => (
        <div key={anime.id} className="bg-white p-4 rounded-lg shadow-md">
          <Link href={`/${anime.id}`} className="flex gap-4">
            <h2 className="text-xl font-semibold">{anime.id}</h2>
            <h2 className="text-xl font-semibold">{foundAnimeIds.includes(anime.id) ? anime.title : ""}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
