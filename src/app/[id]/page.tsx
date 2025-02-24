import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { Button } from "@/components/ui/button";
import { getAnime, getAnimes } from "@/lib/db";
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

  return (
    <div className="">
      <ImageToggle anime={anime} />
      <AnswerForm anime={anime} />
      <div className="flex justify-between">
        <Button variant={"secondary"} asChild disabled={parseInt(id) < 2}>
          <Link href={`/${parseInt(id) - 1}`}>Précédent</Link>
        </Button>
        <Button variant={"secondary"} asChild disabled={parseInt(id) >= getAnimes().length}>
          <Link href={`/${parseInt(id) + 1}`}>Suivant</Link>
        </Button>
      </div>
    </div>
  );
}
