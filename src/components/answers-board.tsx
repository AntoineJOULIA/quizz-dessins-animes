"use client";

import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { Anime, Status } from "@/types";
import { ArrowLeft, CircleX, Minus, Trophy } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { getAnimes } from "@/lib/db";
import { cn, imagePrefix } from "@/lib/utils";
import Image from "next/image";
import { useDragonBalls } from "@/hooks/useDragonBalls";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function AnswerBoard({ animes }: { animes: Anime[] }) {
  const [animeStatus] = useAnimeStatus();
  const totalCount = getAnimes().length;
  const router = useRouter();

  const { foundDragonBalls } = useDragonBalls();

  return (
    <main className="container mx-auto relative">
      <Button className="absolute top-0 left-0" variant={"link"} onClick={() => router.back()}>
        <ArrowLeft className="size-4 mr-2" />
        Retour
      </Button>
      <Achievements statusList={animeStatus} totalCount={totalCount} foundDragonBalls={foundDragonBalls} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-8">
        {animes.map((anime) => (
          <BoardItem key={anime.id} anime={anime} status={animeStatus[anime.id]} />
        ))}
      </div>
    </main>
  );
}

function Achievements({
  statusList,
  totalCount,
  foundDragonBalls,
}: {
  statusList: {
    [key: string]: Status;
  };
  totalCount: number;
  foundDragonBalls: string[];
}) {
  const correctCount = Object.values(statusList).filter((status) => status === "correct").length;
  return (
    <div className="grid grid-cols-2 gap-8">
      <Score correctCount={correctCount} totalCount={totalCount} />
      <Sanctuary correctCount={correctCount} totalCount={totalCount} />
      <DragonBallCollection found={foundDragonBalls} />
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

function Score({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  return (
    <div className="flex flex-col items-center col-span-2">
      <p className="text-xl">Dessins animés trouvés</p>
      <p className="text-xl">
        {" "}
        <span className="text-6xl font-black">{correctCount}</span> / {totalCount}
      </p>
    </div>
  );
}

function Sanctuary({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const currentScore = correctCount / totalCount;
  return (
    <div className="bg-sky-100 rounded-lg grid grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2">
      <Image
        className=""
        src={imagePrefix() + "assets/images/horloge-sanctuaire.png"}
        width={50}
        height={50}
        alt="Horloge du Sanctuaire"
      />
      <p className="text-2xl font-bold col-span-2 gap-4">Sanctuaire</p>
      <div className="col-start-2 flex flex-col gap-2">
        <p>Traverse les 12 maisons du sanctuaire pour atteindre le Grand Pope.</p>
        <p>Chaque bonne réponse te rapproche de ton objectif !</p>
        {correctCount >= totalCount - 5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison des</p>
            <p className="self-center text-2xl font-bold">Poissons</p>
          </>
        ) : currentScore >= 0.9 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Verseau</p>
          </>
        ) : currentScore >= 0.8 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Capricorne</p>
          </>
        ) : currentScore >= 0.7 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Sagittaire</p>
          </>
        ) : currentScore >= 0.6 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Scorpion</p>
          </>
        ) : currentScore >= 0.5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison de la</p>
            <p className="self-center text-2xl font-bold">Balance</p>
          </>
        ) : currentScore >= 0.4 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison de la</p>
            <p className="self-center text-2xl font-bold">Vierge</p>
          </>
        ) : currentScore >= 0.3 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Lion</p>
          </>
        ) : currentScore >= 0.2 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Cancer</p>
          </>
        ) : currentScore >= 0.1 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison des</p>
            <p className="self-center text-2xl font-bold">Gémeaux</p>
          </>
        ) : correctCount >= 5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Taureau</p>
          </>
        ) : (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Bélier</p>
          </>
        )}
      </div>
      <div className="grid grid-cols-[repeat(4,50px)] gap-2 place-content-center">
        <Image
          className=""
          src={imagePrefix() + "assets/images/chevalier-or_belier.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Bélier"
        />
        <Image
          className={cn({ "opacity-50": correctCount < 5 })}
          src={imagePrefix() + "assets/images/chevalier-or_taureau.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Taureau"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.1 })}
          src={imagePrefix() + "assets/images/chevalier-or_gemeaux.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or des Gémeaux"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.2 })}
          src={imagePrefix() + "assets/images/chevalier-or_cancer.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Cancer"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.3 })}
          src={imagePrefix() + "assets/images/chevalier-or_lion.jpg"}
          width={50}
          height={60}
          alt="Chevlier d'or du Lion"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.4 })}
          src={imagePrefix() + "assets/images/chevalier-or_vierge.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or de la Vierge"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.5 })}
          src={imagePrefix() + "assets/images/chevalier-or_balance.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or de la Balance"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.6 })}
          src={imagePrefix() + "assets/images/chevalier-or_scorpion.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Scorpion"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.7 })}
          src={imagePrefix() + "assets/images/chevalier-or_sagittaire.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Sagittaire"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.8 })}
          src={imagePrefix() + "assets/images/chevalier-or_capricorne.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Capricorne"
        />
        <Image
          className={cn({ "opacity-50": currentScore < 0.9 })}
          src={imagePrefix() + "assets/images/chevalier-or_verseau.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or du Verseau"
        />
        <Image
          className={cn({ "opacity-50": correctCount < totalCount - 5 })}
          src={imagePrefix() + "assets/images/chevalier-or_poissons.jpg"}
          width={50}
          height={60}
          alt="Chevalier d'or des Poissons"
        />
      </div>
    </div>
  );
}

function DragonBallCollection({ found }: { found: string[] }) {
  return (
    <div className="bg-green-100 rounded-lg grid grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2">
      <Image
        className=""
        src={imagePrefix() + "assets/images/dragon-ball_radar.png"}
        width={50}
        height={50}
        alt="Détecteur de dragon balls"
      />
      <p className="text-2xl font-bold col-span-2 gap-4">Boules de cristal</p>
      <div className="col-start-2 flex flex-col gap-2">
        <p>Pars à la recherche des boules de cristal disséminées dans le jeu.</p>
        <p>Trouve les 7 boules et le Dragon Sacré exhaussera un voeu !</p>
      </div>
      <div className="grid grid-cols-[repeat(3,50px)] gap-2 place-items-center place-content-center">
        {found.includes("1") ? (
          <Image
            className="col-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_1-etoile.png"}
            width={50}
            height={50}
            alt="Dragon ball à 1 étoile"
          />
        ) : (
          <EmptySlot className="col-start-2 row-span-2" />
        )}
        {found.includes("2") ? (
          <Image
            className="row-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_2-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 2 étoiles"
          />
        ) : (
          <EmptySlot className="row-start-2 row-span-2" />
        )}
        {found.includes("3") ? (
          <Image
            className="col-start-3 row-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_3-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 3 étoiles"
          />
        ) : (
          <EmptySlot className="col-start-3 row-start-2 row-span-2" />
        )}
        {found.includes("4") ? (
          <Image
            className="col-start-2 row-start-3 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_4-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 4 étoiles"
          />
        ) : (
          <EmptySlot className="col-start-2 row-start-3 row-span-2" />
        )}
        {found.includes("5") ? (
          <Image
            className="col-start-1 row-start-4 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_5-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 5 étoiles"
          />
        ) : (
          <EmptySlot className="col-start-1 row-start-4 row-span-2" />
        )}
        {found.includes("6") ? (
          <Image
            className="col-start-3 row-start-4 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_6-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 6 étoiles"
          />
        ) : (
          <EmptySlot className="col-start-3 row-start-4 row-span-2" />
        )}
        {found.includes("7") ? (
          <Image
            className="col-start-2 row-start-5 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_7-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 7 étoiles"
          />
        ) : (
          <EmptySlot className="col-start-2 row-start-5 row-span-2" />
        )}
      </div>
    </div>
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
