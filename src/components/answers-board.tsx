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
    <div className="container space-y-8 mx-auto relative">
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
      {/* <TrophyBar correctCount={correctCount} totalCount={totalCount} /> */}
      <DragonBallCollection found={[1, 2, 4, 5, 7]} />
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

function DragonBallCollection({ found }: { found: number[] }) {
  return (
    <div className="grid grid-cols-[repeat(3,50px)] gap-2 place-items-center">
      {found.includes(1) ? (
        <Image
          className="col-start-2 row-span-2"
          src="/assets/images/dragon-ball_1-etoile.png"
          width={50}
          height={50}
          alt="Dragon ball à 1 étoile"
        />
      ) : (
        <EmptySlot className="col-start-2 row-span-2" />
      )}
      {found.includes(2) ? (
        <Image
          className="row-start-2 row-span-2"
          src="/assets/images/dragon-ball_2-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 2 étoiles"
        />
      ) : (
        <EmptySlot className="row-start-2 row-span-2" />
      )}
      {found.includes(3) ? (
        <Image
          className="col-start-3 row-start-2 row-span-2"
          src="/assets/images/dragon-ball_3-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 3 étoiles"
        />
      ) : (
        <EmptySlot className="col-start-3 row-start-2 row-span-2" />
      )}
      {found.includes(4) ? (
        <Image
          className="col-start-2 row-start-3 row-span-2"
          src="/assets/images/dragon-ball_4-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 4 étoiles"
        />
      ) : (
        <EmptySlot className="col-start-2 row-start-3 row-span-2" />
      )}
      {found.includes(5) ? (
        <Image
          className="col-start-1 row-start-4 row-span-2"
          src="/assets/images/dragon-ball_5-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 5 étoiles"
        />
      ) : (
        <EmptySlot className="col-start-1 row-start-4 row-span-2" />
      )}
      {found.includes(6) ? (
        <Image
          className="col-start-3 row-start-4 row-span-2"
          src="/assets/images/dragon-ball_6-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 6 étoiles"
        />
      ) : (
        <EmptySlot className="col-start-3 row-start-4 row-span-2" />
      )}
      {found.includes(7) ? (
        <Image
          className="col-start-2 row-start-5 row-span-2"
          src="/assets/images/dragon-ball_7-etoiles.png"
          width={50}
          height={50}
          alt="Dragon ball à 7 étoiles"
        />
      ) : (
        <EmptySlot className="col-start-2 row-start-5 row-span-2" />
      )}
    </div>
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
        <div className="grid grid-cols-[repeat(3,50px)] gap-2">
          {/* {correctCount >= 5 && 
            <Image src="/assets/images/dragon-ball_1-etoile.png" width={50} height={50} alt="Dragon ball à 1 étoile" />
          }
      {correctCount >= 10 && 
            <Image src="/assets/images/dragon-ball_2-etoiles.png" width={50} height={50} alt="Dragon ball à 2 étoiles" />
      } */}

          {correctCount >= 1 && (
            <Image
              className="col-start-2 row-span-2"
              src="/assets/images/dragon-ball_1-etoile.png"
              width={50}
              height={50}
              alt="Dragon ball à 1 étoile"
            />
          )}
          {correctCount >= 2 && (
            <Image
              className="row-start-2 row-span-2"
              src="/assets/images/dragon-ball_2-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 2 étoiles"
            />
          )}
          {currentScore >= 0.175 && (
            <Image
              className="col-start-3 row-start-2 row-span-2"
              src="/assets/images/dragon-ball_3-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 3 étoiles"
            />
          )}
          {currentScore >= 0.3 && (
            <Image
              className="col-start-2 row-start-3 row-span-2"
              src="/assets/images/dragon-ball_4-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 3 étoiles"
            />
          )}
          {currentScore >= 0.5 && (
            <Image
              className="col-start-1 row-start-4 row-span-2"
              src="/assets/images/dragon-ball_5-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 5 étoiles"
            />
          )}
          {currentScore >= 0.75 && (
            <Image
              className="col-start-3 row-start-4 row-span-2"
              src="/assets/images/dragon-ball_6-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 6 étoiles"
            />
          )}
          {correctCount >= totalCount - 1 && (
            <Image
              className="col-start-2 row-start-5 row-span-2"
              src="/assets/images/dragon-ball_7-etoiles.png"
              width={50}
              height={50}
              alt="Dragon ball à 6 étoiles"
            />
          )}
        </div>
      )}
    </>
  );
}

function EmptySlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-9 m-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 border-gray-300",
        className
      )}
    ></div>
  );
}
