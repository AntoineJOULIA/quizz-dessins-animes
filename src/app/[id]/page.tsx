import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { getAnime, getAnimes } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const animes = getAnimes();

  return animes.map((anime) => ({
    id: anime.id,
  }));
}

export default async function QuizzPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const anime = getAnime(id);
  if (!anime) {
    notFound();
  }

  const prevId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[1rem_90px_3fr_2fr_90px_1rem] gap-x-20 gap-y-8">
      <div className="row-span-2"></div>
      <p className="col-start-3 col-span-3 text-6xl font-black">{anime.id.padStart(3, "0")}</p>
      <div className="row-span-2"></div>
      {prevId > 0 ? (
        <Link
          href={`/${prevId}`}
          className="self-stretch flex justify-center items-center hover:bg-zinc-100 rounded-lg p-4"
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
          className="self-stretch flex justify-center items-center hover:bg-zinc-100 rounded-lg p-4"
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
