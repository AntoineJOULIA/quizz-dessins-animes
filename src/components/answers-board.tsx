"use client";

import { Status, useAnimeStatus } from "@/hooks/useAnimeStatus";
import { Anime } from "@/types";
import { CircleX, Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const [animeStatus] = useAnimeStatus();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 container mx-auto">
      {animes.map((anime) => (
        <BoardItem key={anime.id} anime={anime} status={animeStatus[anime.id]} />
      ))}
    </div>
  );
}

function BoardItem({ anime, status }: { anime: Anime; status: Status }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${anime.id}`}
            className="flex items-center gap-2 p-4 rounded-lg outline outline-gray-200 outline-1"
          >
            <p>{anime.id.padStart(3, "0")}</p>
            {status === "correct" ? (
              <Trophy className="size-6 text-yellow-500" />
            ) : status === "wrong" ? (
              <CircleX className="size-6 text-red-500" />
            ) : (
              <Minus className="w-6" />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent>{status === "correct" ? anime.title : "Pas encore trouvé !"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
