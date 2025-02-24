import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="outline outline-sky-400">
      <h1 className="text-5xl font-bold">Quizz sur les dessins animés de notre enfance</h1>
      <Button asChild className="p-4 border border-gray-200">
        <Link href="/1">Commencer</Link>
      </Button>
    </div>
  );
}
