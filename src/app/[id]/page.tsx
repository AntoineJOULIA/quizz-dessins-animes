import AnswerForm from "@/components/answer-form";
import { ImageToggle } from "@/components/image-toggle";
import { getAnime } from "@/lib/db";
import { notFound } from "next/navigation";

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
