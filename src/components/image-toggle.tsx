"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

const PREFIX = process.env.NODE_ENV !== "production" ? "/" : "";

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
        className="aspect-4/3 object-cover w-full h-[600px]"
        src={hintType === "easy" ? PREFIX + anime.easyHint : PREFIX + anime.hardHint}
        width={800}
        height={600}
        alt="hint image"
      />
      <div className="flex gap-4">
        <Button
          className="text-xl px-8 py-6"
          size={"lg"}
          variant={hintType === "hard" ? "outline" : "secondary"}
          onClick={() => setHintType("hard")}
        >
          Indice difficile
        </Button>
        <Button
          className="text-xl px-8 py-6"
          size={"lg"}
          variant={hintType === "easy" ? "outline" : "secondary"}
          onClick={() => setHintType("easy")}
        >
          Indice facile
        </Button>
        <Button
          className="text-xl px-8 py-6"
          size={"lg"}
          variant={"secondary"}
          onClick={() => setIsTitleHintDisplayed(true)}
        >
          Indice titre
        </Button>
      </div>
      {isTitleHintDisplayed && <p className="text-2xl tracking-[0.2em]">{toHiddenTitle(anime.title)}</p>}
    </div>
  );
}
