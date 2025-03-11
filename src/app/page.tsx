import { NewGameButton } from "@/components/new-game-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { imagePrefix } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow">
      <Image
        src={imagePrefix() + "assets/homepage/homepage_illu.png"}
        width={1000}
        height={686}
        alt="Grand Quizz des dessins animés de notre enfance"
      />
      <div className="flex gap-4">
        <NewGameButton />
        <Button asChild variant={"outline"} size={"lg"} className="">
          <Link className="flex items-center gap-4" href="/1">
            <svg className="size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 11">
              <g fill="currentColor">
                <path d="M3 .5A2.506 2.506 0 0 0 .5 3v4C.5 8.376 1.624 9.5 3 9.5h16c1.376 0 2.5-1.124 2.5-2.5V3c0-1.376-1.124-2.5-2.5-2.5Zm0 1h16c.84 0 1.5.66 1.5 1.5v4c0 .84-.66 1.5-1.5 1.5H3c-.84 0-1.5-.66-1.5-1.5V3c0-.84.66-1.5 1.5-1.5Z" />
                <path d="M5 3c-.545 0-1 .455-1 1 0 .545.455 1 1 1h8c.545 0 1-.455 1-1 0-.545-.455-1-1-1H5zm13 0a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1zm0 2a1 1 0 0 0-1 1 1 1 0 0 0 1 1 1 1 0 0 0 1-1 1 1 0 0 0-1-1zM4 9c-.554 0-1 .446-1 1s.446 1 1 1h2c.554 0 1-.446 1-1s-.446-1-1-1H4zm13 0c-.554 0-1 .446-1 1s.446 1 1 1h2c.554 0 1-.446 1-1s-.446-1-1-1h-2z" />
              </g>
            </svg>
            Continuer
          </Link>
        </Button>
      </div>
    </div>
  );
}
