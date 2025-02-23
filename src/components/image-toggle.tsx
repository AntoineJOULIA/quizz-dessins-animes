"use client";

import Image from "next/image";
import { useState } from "react";

// const PREFIX = process.env.NODE_ENV !== "production" ? "/" : "";

// const hardHint = PREFIX + "assets/images/dragon-ball-01.png";
// const easyHint = PREFIX + "assets/images/dragon-ball-02.jpg";
const hardHint = process.env.NEXT_PUBLIC_IMAGE_SRC_PATH_PREFIX + "assets/images/dragon-ball-01.png";
const easyHint = process.env.NEXT_PUBLIC_IMAGE_SRC_PATH_PREFIX + "assets/images/dragon-ball-02.jpg";

export function ImageToggle() {
  const [imageSrc, setImageSrc] = useState(hardHint);

  return (
    <div className="grid gap-4 place-items-center">
      <Image src={imageSrc} width={300} height={300} alt="hint image" />
      <div className="flex gap-4">
        <button className="p-4 border border-gray-200" onClick={() => setImageSrc(hardHint)}>
          Indice difficile
        </button>
        <button className="p-4 border border-gray-200" onClick={() => setImageSrc(easyHint)}>
          Indice facile
        </button>
      </div>
    </div>
  );
}
