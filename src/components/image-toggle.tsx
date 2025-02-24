"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";

const PREFIX = process.env.NODE_ENV !== "production" ? "/" : "";

export function ImageToggle({ anime }: { anime: Anime }) {
  const [imageSrc, setImageSrc] = useState(PREFIX + anime.hardHint);

  return (
    <div className="grid gap-4 place-items-center">
      <Image src={imageSrc} width={300} height={300} alt="hint image" />
      <div className="flex gap-4">
        <button className="p-4 border border-gray-200" onClick={() => setImageSrc(PREFIX + anime.hardHint)}>
          Indice difficile
        </button>
        <button className="p-4 border border-gray-200" onClick={() => setImageSrc(PREFIX + anime.easyHint)}>
          Indice facile
        </button>
      </div>
    </div>
  );
}
