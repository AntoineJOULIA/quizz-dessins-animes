import { NewGameButton } from "@/components/new-game-button";
import Image from "next/image";
import { imagePrefix } from "@/lib/utils";
import { ResumeGameButton } from "@/components/resume-game-button";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto grow">
      <Image
        src={imagePrefix("") + "assets/homepage/homepage_illu.png"}
        width={1000}
        height={686}
        alt="Grand Quizz des dessins animés de notre enfance"
      />
      <div className="flex gap-4">
        <NewGameButton />
        <ResumeGameButton />
      </div>
    </div>
  );
}
