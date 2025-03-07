"use client";

import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { Anime, Status } from "@/types";
import { CircleX, Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getAnimes } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <div>
      <p className="text-2xl text-center">
        Score actuel : <span className="text-6xl font-black">{correctCount}</span> / {totalCount}
      </p>
      <Image src="/assets/images/dragon-ball_radar.png" width={50} height={50} alt="Détecteur de dragon balls" />
      <TrophyBar correctCount={correctCount} totalCount={totalCount} />
    </div>
  );
}

function BoardItem({ anime, status }: { anime: Anime; status: Status }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={`/${anime.index}`}
            className={cn("flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-100", {
              "bg-yellow-50 border-yellow-500 hover:bg-yellow-100": status === "correct",
              "bg-red-50 border-red-500 hover:bg-red-100": status === "wrong",
            })}
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

// https://www.citypng.com/photo/27988/hd-png-dragon-ball-z-dbz-crystal-ball-4-stars
function TrophyBar({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const currentScore = correctCount / totalCount;
  return (
    <>
      {correctCount === totalCount ? (
        <div className="absolute inset-0 grid justify-items-center">
          <Image
            className="h-[80vh] w-auto place-self-center"
            src="/assets/images/dragon-ball_shenron.png"
            width={1140}
            height={1656}
            alt="Shenron, le dragon sacré"
          />
        </div>
      ) : (
        <div className="flex gap-4">
          {/* {correctCount >= 5 && 
            <Image src="/assets/images/dragon-ball_1-star.png" width={50} height={50} alt="Dragon ball à 1 étoile" />
          }
      {correctCount >= 10 && 
            <Image src="/assets/images/dragon-ball_2-stars.png" width={50} height={50} alt="Dragon ball à 2 étoiles" />
      } */}
          {correctCount >= 1 && (
            <Image src="/assets/images/dragon-ball_1-star.png" width={50} height={50} alt="Dragon ball à 1 étoile" />
          )}
          {correctCount >= 2 && (
            <Image src="/assets/images/dragon-ball_2-stars.png" width={50} height={50} alt="Dragon ball à 2 étoiles" />
          )}
          {currentScore >= 0.175 && (
            <Image src="/assets/images/dragon-ball_3-stars.png" width={50} height={50} alt="Dragon ball à 3 étoiles" />
          )}
          {currentScore >= 0.3 && (
            <Image src="/assets/images/dragon-ball_3-stars.png" width={50} height={50} alt="Dragon ball à 3 étoiles" />
            // <Image src="/assets/images/dragon-ball_4-stars.png" width={50} height={50} alt="Dragon ball à 4 étoiles" />
          )}
          {currentScore >= 0.5 && (
            <Image src="/assets/images/dragon-ball_5-stars.png" width={50} height={50} alt="Dragon ball à 5 étoiles" />
          )}
          {currentScore >= 0.75 && (
            <Image src="/assets/images/dragon-ball_6-stars.png" width={50} height={50} alt="Dragon ball à 6 étoiles" />
          )}
          {correctCount >= totalCount - 1 && (
            <Image src="/assets/images/dragon-ball_6-stars.png" width={50} height={50} alt="Dragon ball à 6 étoiles" />
            // <Image src="/assets/images/dragon-ball_7-stars.png" width={50} height={50} alt="Dragon ball à 7 étoiles" />
          )}
        </div>
      )}
    </>
  );
}
