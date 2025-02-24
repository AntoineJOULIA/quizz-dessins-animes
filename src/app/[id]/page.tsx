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
      <p>Page id: {id}</p>
      <p>{anime?.title}</p>
    </div>
  );
}
