import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { getAnime, getAnimes } from "@/lib/db";
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

  return (
    <div className="">
      <ImageToggle anime={anime} />
      <AnswerForm anime={anime} />
    </div>
  );
}
