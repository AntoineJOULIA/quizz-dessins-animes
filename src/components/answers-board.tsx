"use client";

import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { Anime, Status } from "@/types";
import { CircleX, Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getAnimes } from "@/lib/db";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const [animeStatus] = useAnimeStatus();
  const totalCount = getAnimes().length;

  return (
    <div className="container space-y-8 mx-auto">
      <Score statusList={animeStatus} totalCount={totalCount} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
        {animes.map((anime) => (
          <BoardItem key={anime.id} anime={anime} status={animeStatus[anime.id]} />
        ))}
      </div>
    </div>
  );
}

function Score({
  statusList,
  totalCount,
}: {
  statusList: {
    [key: string]: Status;
  };
  totalCount: number;
}) {
  const correctCount = Object.values(statusList).filter((status) => status === "correct").length;
  return (
    <p className="text-2xl text-center">
      Score actuel : <span className="text-6xl font-black">{correctCount}</span> / {totalCount}
    </p>
  );
}

function BoardItem({ anime, status }: { anime: Anime; status: Status }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${anime.index}`}
            className="flex items-center gap-2 p-4 rounded-lg outline outline-gray-200 outline-1"
          >
            <p>{anime.index.padStart(3, "0")}</p>
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
