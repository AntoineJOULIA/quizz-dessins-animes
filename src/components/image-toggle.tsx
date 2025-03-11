"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn, imagePrefix } from "@/lib/utils";
import { Baby, Glasses, GraduationCap } from "lucide-react";

// Replace all characters (except the first one) by '_'
function toHiddenTitle(title: string) {
  return title.charAt(0) + title.slice(1).replace(/[\p{L}0-9]/gu, "_");
}

export function ImageToggle({ anime }: { anime: Anime }) {
  const [hintType, setHintType] = useState<"easy" | "hard">("hard");
  const [isTitleHintDisplayed, setIsTitleHintDisplayed] = useState(false);

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
    </div>
  );
}
