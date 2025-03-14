/* Trick to make dynamic tailwind classes work */
// text-zinc-500
// text-red-500
// text-rose-500
// text-orange-500
// text-green-500
// text-blue-500
// text-yellow-500
// text-violet-500

import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { COLORS } from "@/lib/constants";
import { getAnime, getAnimes } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const animes = getAnimes();

  return animes.map((anime) => ({
    index: anime.index,
  }));
}

function randomTextColor() {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  const randomColor = COLORS[randomIndex];
  return `text-${randomColor}-500`;
}

export default async function QuizzPage({ params }: { params: Promise<{ index: string }> }) {
  const { index } = await params;

  const anime = getAnime(index);
  if (!anime) {
    notFound();
  }

  const prevId = parseInt(index) - 1;
  const nextId = parseInt(index) + 1;

  return (
    <div className="container mx-auto grid grid-cols-[90px_3fr_2fr_90px] gap-x-20 gap-y-4">
      <p className={`col-start-2 col-span-3 text-6xl font-black ${randomTextColor()}`}>
        {anime.index.toString().padStart(3, "0")}
      </p>
      {prevId > 0 ? (
        <Link
          href={`/${prevId}`}
          className="self-stretch flex justify-center items-center hover:bg-accent rounded-lg p-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {prevId.toString().padStart(3, "0")}
        </Link>
      ) : (
        <div></div>
      )}
      <ImageToggle anime={anime} />
      <AnswerForm anime={anime} />

      {nextId <= getAnimes().length ? (
        <Link
          href={`/${nextId}`}
          className="self-stretch flex justify-center items-center hover:bg-accent rounded-lg p-4"
        >
          {nextId.toString().padStart(3, "0")}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
