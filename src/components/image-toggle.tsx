"use client";

import { Anime } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PREFIX = process.env.NODE_ENV !== "production" ? "/" : "";

export function ImageToggle({ anime }: { anime: Anime }) {
  const [imageSrc, setImageSrc] = useState(PREFIX + anime.hardHint);

  return (
    <div className="grid gap-4 place-items-center">
      <Image src={imageSrc} width={800} height={600} alt="hint image" />
      <div className="flex gap-4">
        <Button className="p-4 border border-gray-200" onClick={() => setImageSrc(PREFIX + anime.hardHint)}>
          Indice difficile
        </Button>
        <Button className="p-4 border border-gray-200" onClick={() => setImageSrc(PREFIX + anime.easyHint)}>
          Indice facile
        </Button>
      </div>
    </div>
  );
}
