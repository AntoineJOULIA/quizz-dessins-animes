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
          <Link className="flex items-center gap-4" href="/1">
            <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 11">
              <path
                fill="#000"
                d="M3 0C1.355 0 0 1.355 0 3v4c0 1.645 1.355 3 3 3 0 .554.446 1 1 1h2c.554 0 1-.446 1-1h9c0 .554.446 1 1 1h2a.998.998 0 0 0 .984-1.174C21.151 9.414 22 8.3 22 7V3c0-1.645-1.355-3-3-3H3zm0 2h16c.571 0 1 .429 1 1v4c0 .571-.429 1-1 1H3c-.571 0-1-.429-1-1V3c0-.571.429-1 1-1zm2 1c-.554 0-1 .446-1 1s.446 1 1 1h8c.554 0 1-.446 1-1s-.446-1-1-1H5zm13 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1zm0 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1z"
                color="#000"
              />
            </svg>
            Continuer
          </Link>
        </Button>
      </div>
    </div>
  );
}
