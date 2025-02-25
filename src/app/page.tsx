import { NewGameButton } from "@/components/new-game-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="outline outline-sky-400">
      <h1 className="text-5xl font-bold">Quizz sur les dessins animés de notre enfance</h1>
      <div className="flex gap-4">
        <NewGameButton />
        <Button asChild variant={"outline"}>
          <Link href="/1">Commencer</Link>
        </Button>
      </div>
    </div>
  );
}
