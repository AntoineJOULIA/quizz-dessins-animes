import { sanctuaryHousesThresholds } from "@/lib/constants";
import { cn, imagePrefix } from "@/lib/utils";
import Image from "next/image";

export function Sanctuary({ correctCount, totalCount }: { correctCount: number; totalCount: number }) {
  const currentScore = correctCount / totalCount;
  return (
    <div className="bg-sky-100 rounded-lg grid grid-cols-[auto,minmax(auto,40ch),1fr] p-8 gap-x-6 gap-y-2">
      <Image
        className=""
        src={imagePrefix() + "assets/images/horloge-sanctuaire.png"}
        width={50}
        height={50}
        alt="Horloge du Sanctuaire"
      />
      <p className="text-2xl font-bold col-span-2 gap-4">Sanctuaire</p>
      <div className="col-start-2 flex flex-col gap-2">
        <p>Traverse les 12 maisons du sanctuaire pour atteindre le Grand Pope.</p>
        <p>Chaque bonne réponse te rapproche de ton objectif !</p>
        {correctCount === totalCount ? (
          <div className="">
            <p className="self-center text-2xl font-bold text-center">Bravo, tu as sauvé</p>
            <p className="self-center text-2xl font-bold text-center">Athéna !</p>
          </div>
        ) : correctCount >= totalCount - 1 ? (
          <>
            <p className="text-xl self-center mt-6">Tu affrontes</p>
            <p className="self-center text-2xl font-bold">le Grand Pope !</p>
          </>
        ) : correctCount >= totalCount - 5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison des</p>
            <p className="self-center text-2xl font-bold">Poissons</p>
          </>
        ) : currentScore >= 0.9 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Verseau</p>
          </>
        ) : currentScore >= 0.8 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Capricorne</p>
          </>
        ) : currentScore >= 0.7 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Sagittaire</p>
          </>
        ) : currentScore >= 0.6 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Scorpion</p>
          </>
        ) : currentScore >= 0.5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison de la</p>
            <p className="self-center text-2xl font-bold">Balance</p>
          </>
        ) : currentScore >= 0.4 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison de la</p>
            <p className="self-center text-2xl font-bold">Vierge</p>
          </>
        ) : currentScore >= 0.3 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Lion</p>
          </>
        ) : currentScore >= 0.2 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Cancer</p>
          </>
        ) : currentScore >= 0.1 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison des</p>
            <p className="self-center text-2xl font-bold">Gémeaux</p>
          </>
        ) : correctCount >= 5 ? (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Taureau</p>
          </>
        ) : (
          <>
            <p className="text-xl self-center mt-6">Tu es actuellement dans la maison du</p>
            <p className="self-center text-2xl font-bold">Bélier</p>
          </>
        )}
      </div>
      {correctCount === totalCount ? (
        <div className="">
          <Image className="" src={imagePrefix() + "assets/images/athena.png"} width={200} height={200} alt="Athéna" />
        </div>
      ) : correctCount === totalCount - 1 ? (
        <div className="">
          <Image
            className=""
            src={imagePrefix() + "assets/images/grand-pope.jpg"}
            width={150}
            height={180}
            alt="Grand Pope"
          />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(4,50px)] gap-2 place-content-center">
          <Image
            className=""
            src={imagePrefix() + "assets/images/chevalier-or_belier.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Bélier"
          />
          <Image
            className={cn({ "opacity-50": correctCount < sanctuaryHousesThresholds.taureau })}
            src={imagePrefix() + "assets/images/chevalier-or_taureau.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Taureau"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.gemeaux })}
            src={imagePrefix() + "assets/images/chevalier-or_gemeaux.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or des Gémeaux"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.cancer })}
            src={imagePrefix() + "assets/images/chevalier-or_cancer.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Cancer"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.lion })}
            src={imagePrefix() + "assets/images/chevalier-or_lion.jpg"}
            width={50}
            height={60}
            alt="Chevlier d'or du Lion"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.vierge })}
            src={imagePrefix() + "assets/images/chevalier-or_vierge.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or de la Vierge"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.balance })}
            src={imagePrefix() + "assets/images/chevalier-or_balance.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or de la Balance"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.scorpion })}
            src={imagePrefix() + "assets/images/chevalier-or_scorpion.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Scorpion"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.sagittaire })}
            src={imagePrefix() + "assets/images/chevalier-or_sagittaire.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Sagittaire"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.capricorne })}
            src={imagePrefix() + "assets/images/chevalier-or_capricorne.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Capricorne"
          />
          <Image
            className={cn({ "opacity-50": currentScore < sanctuaryHousesThresholds.verseau })}
            src={imagePrefix() + "assets/images/chevalier-or_verseau.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or du Verseau"
          />
          <Image
            className={cn({ "opacity-50": correctCount < totalCount - sanctuaryHousesThresholds.poissons })}
            src={imagePrefix() + "assets/images/chevalier-or_poissons.jpg"}
            width={50}
            height={60}
            alt="Chevalier d'or des Poissons"
          />
        </div>
      )}
    </div>
  );
}
