"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

const PREFIX = process.env.NODE_ENV !== "production" ? "/" : "";

export function ImageToggle({ anime }: { anime: Anime }) {
  const [hintType, setHintType] = useState<"easy" | "hard">("hard");

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
      </div>
    </div>
  );
}
