"use client";

import { useAnswers } from "@/hooks/useAnswers";
import { Anime } from "@/types";
import { Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const { correctAnswers } = useAnswers();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 container mx-auto">
      {animes.map((anime) => (
        <BoardItem key={anime.id} anime={anime} correctAnswers={correctAnswers} />
      ))}
    </div>
  );
}

function BoardItem({ anime, correctAnswers }: { anime: Anime; correctAnswers: string[] }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${anime.id}`}
            className="flex items-center gap-2 p-4 rounded-lg outline outline-gray-200 outline-1"
          >
            <p>{anime.id.padStart(3, "0")}</p>
            {correctAnswers.includes(anime.id) ? (
              <Trophy className="size-6 text-yellow-500" />
            ) : (
              <Minus className="size-4" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{correctAnswers.includes(anime.id) ? anime.title : "Pas encore trouvé !"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
