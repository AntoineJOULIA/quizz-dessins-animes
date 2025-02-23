import { ImageToggle } from "@/components/image-toggle";
import { Anime } from "@/types";
import data from "../data/dessins-animes.json";

export default function Home() {
  const animes = data as Anime[];

  return (
    <div className="outline outline-sky-400">
      <ImageToggle anime={animes[0]} />
    </div>
  );
}
