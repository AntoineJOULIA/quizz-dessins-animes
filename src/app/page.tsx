import { NewGameButton } from "@/components/new-game-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bungee_Shade, Damion } from "next/font/google";

const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const damion = Damion({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow gap-32 mt-24">
      <div className="grid gap-6 content-center text-center">
        <h1 className={`text-8xl ${bungeeShade.className}`}>Grand quizz</h1>
        <div>
          <p className="text-6xl">
            Sur les <span className={`text-8xl ${damion.className}`}>dessins animés</span>
          </p>
          <p className="text-6xl">de notre enfance</p>
        </div>
      </div>
      <div className="flex gap-8">
        <NewGameButton />
        <Button asChild variant={"outline"} size={"lg"} className="text-2xl font-bold px-12 py-8">
          <Link href="/1">Continuer</Link>
        </Button>
      </div>
    </div>
  );
}
