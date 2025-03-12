"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { capitalize, cn, imagePrefix } from "@/lib/utils";
import { Baby, ChevronRight, Glasses, GraduationCap } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useSanctuary } from "@/hooks/useSanctuary";

// Replace all characters (except the first one) by '_'
function toHiddenTitle(title: string) {
  return title.charAt(0) + title.slice(1).replace(/[\p{L}0-9]/gu, "_");
}

export function ImageToggle({ anime }: { anime: Anime }) {
  const [hintType, setHintType] = useState<"easy" | "hard">("hard");
  const [isTitleHintDisplayed, setIsTitleHintDisplayed] = useState(false);
  const [showSanctuaryModal, setShowSanctuaryModal] = useState(false);
  const [hasSanctuaryModalBeenShown, setHasSanctuaryModalBeenShown] = useState(false);
  const router = useRouter();
  const { entersHouse, currentHouse, getHouseParticle } = useSanctuary();

  if (currentHouse && entersHouse && !showSanctuaryModal && !hasSanctuaryModalBeenShown) {
    setShowSanctuaryModal(true);
    setHasSanctuaryModalBeenShown(true);
  }

  return (
    <div className="grid gap-4 place-items-center">
      <Image
        className="aspect-4/3 object-cover w-full h-[500px]"
        src={hintType === "easy" ? imagePrefix() + anime.easyHint : imagePrefix() + anime.hardHint}
        width={800}
        height={600}
        alt="hint image"
      />
      <div className="flex gap-4 w-full">
        <Button
          className={cn("text-xl px-8 py-6 grow", {
            "outline-double outline-2 outline-gray-800": hintType === "hard",
          })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("hard")}
        >
          <GraduationCap className="mr-2" />
          Image difficile
        </Button>
        <Button
          className={cn("text-xl px-8 py-6 grow", { "outline-double outline-2 outline-gray-800": hintType === "easy" })}
          size={"lg"}
          variant={"outline"}
          onClick={() => setHintType("easy")}
        >
          <Baby className="mr-2" />
          Image facile
        </Button>
      </div>
      <div className="flex gap-4 w-full items-center">
        <Button className="text-xl px-8 py-6" variant={"ghost"} onClick={() => setIsTitleHintDisplayed(true)}>
          <Glasses className="mr-2" />
          Indice titre
        </Button>
        {isTitleHintDisplayed && <p className="text-2xl tracking-[0.2em]">{toHiddenTitle(anime.title)}</p>}
      </div>
      <AlertDialog open={showSanctuaryModal} onOpenChange={setShowSanctuaryModal}>
        <AlertDialogContent className="flex flex-col">
          <AlertDialogHeader className="justify-self-center">
            <AlertDialogTitle className="text-center text-2xl">Bravo !</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {currentHouse && (
                <>
                  <span className="block">
                    Tu as atteint la maison {getHouseParticle(currentHouse)} {capitalize(currentHouse)} ! Continue ton
                    avancée dans le sanctuaire !
                  </span>
                  <Image
                    className="justify-self-center"
                    src={imagePrefix() + `assets/images/chevalier-or_${currentHouse}.jpg`}
                    alt={`Chevalier d'or ${getHouseParticle(currentHouse)} ${currentHouse}`}
                    width={200}
                    height={200}
                  />
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2">
            <AlertDialogCancel>Retourner au quizz</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/board")}>
              Aller voir ma progression
              <ChevronRight className="size-4" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
