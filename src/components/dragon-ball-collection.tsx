import { useDragonBalls } from "@/hooks/useDragonBalls";
import { cn, imagePrefix } from "@/lib/utils";
import Image from "next/image";

export function DragonBallCollection() {
  const { foundDragonBalls: found } = useDragonBalls();
  return (
    <div className="bg-green-100 rounded-lg grid grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2">
      <Image
        className=""
        src={imagePrefix() + "assets/images/dragon-ball_radar.png"}
        width={50}
        height={50}
        alt="Détecteur de dragon balls"
      />
      <p className="text-2xl font-bold col-span-2 gap-4">Boules de cristal</p>
      <div className="col-start-2 flex flex-col gap-2">
        <p>Pars à la recherche des boules de cristal disséminées dans le jeu.</p>
        <p>Trouve les 7 boules et le Dragon Sacré exhaussera un voeu !</p>
      </div>
      <div className="grid grid-cols-[repeat(3,50px)] gap-2 place-items-center place-content-center">
        {found.includes("1") ? (
          <Image
            className="col-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_1-etoile.png"}
            width={50}
            height={50}
            alt="Dragon ball à 1 étoile"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-2 row-span-2" />
        )}
        {found.includes("2") ? (
          <Image
            className="row-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_2-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 2 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="row-start-2 row-span-2" />
        )}
        {found.includes("3") ? (
          <Image
            className="col-start-3 row-start-2 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_3-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 3 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-3 row-start-2 row-span-2" />
        )}
        {found.includes("4") ? (
          <Image
            className="col-start-2 row-start-3 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_4-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 4 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-2 row-start-3 row-span-2" />
        )}
        {found.includes("5") ? (
          <Image
            className="col-start-1 row-start-4 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_5-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 5 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-1 row-start-4 row-span-2" />
        )}
        {found.includes("6") ? (
          <Image
            className="col-start-3 row-start-4 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_6-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 6 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-3 row-start-4 row-span-2" />
        )}
        {found.includes("7") ? (
          <Image
            className="col-start-2 row-start-5 row-span-2"
            src={imagePrefix() + "assets/images/dragon-ball_7-etoiles.png"}
            width={50}
            height={50}
            alt="Dragon ball à 7 étoiles"
          />
        ) : (
          <DragonBallEmptySlot className="col-start-2 row-start-5 row-span-2" />
        )}
      </div>
    </div>
  );
}

function DragonBallEmptySlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-9 m-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 border-gray-300",
        className
      )}
    ></div>
  );
}
