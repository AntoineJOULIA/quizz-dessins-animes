"use client";

import { useEffect, useState } from "react";
import { useAnimeStatus } from "./useAnimeStatus";
import { getAnimes } from "@/lib/db";

export type House =
  | "belier"
  | "taureau"
  | "gemeaux"
  | "cancer"
  | "lion"
  | "vierge"
  | "balance"
  | "scorpion"
  | "sagittaire"
  | "capricorne"
  | "verseau"
  | "poissons";

export function useSanctuary() {
  const [currentHouse, setCurrentHouse] = useState<House | null>(null);
  const [animeStatus] = useAnimeStatus();
  const totalCount = getAnimes().length;
  const correctCount = Object.values(animeStatus).filter((status) => status === "correct").length;
  const currentScore = correctCount / totalCount;
  const [traversedHouses, setTraversedHouses] = useState<House[] | null>(null);
  const [entersHouse, setEntersHouse] = useState(false);

  useEffect(() => {
    const storedSanctuaryData = window.localStorage.getItem("sanctuary");
    if (storedSanctuaryData) {
      const sanctuaryData = JSON.parse(storedSanctuaryData);
      setCurrentHouse(sanctuaryData.currentHouse);
      setTraversedHouses(sanctuaryData.traversedHouses);
      setEntersHouse(sanctuaryData.entersHouse);
    }
  }, []);

  function reset() {
    window.localStorage.setItem(
      "sanctuary",
      JSON.stringify({ currentHouse: "belier", traversedHouses: ["belier"], entersHouse: false })
    );
  }

  function updateCurrentHouse(house: House) {
    setCurrentHouse(house);
  }

  function updateSanctuaryHouses() {
    // if (correctCount >= totalCount - 5) {
    //   if (!traversedHouses.includes("poissons")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("poissons");
    //     setTraversedHouses((prev) => [...prev, "poissons"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.9) {
    //   if (!traversedHouses.includes("verseau")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("verseau");
    //     setTraversedHouses((prev) => [...prev, "verseau"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.8) {
    //   if (!traversedHouses.includes("capricorne")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("capricorne");
    //     setTraversedHouses((prev) => [...prev, "capricorne"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.7) {
    //   if (!traversedHouses.includes("sagittaire")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("sagittaire");
    //     setTraversedHouses((prev) => [...prev, "sagittaire"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.6) {
    //   if (!traversedHouses.includes("scorpion")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("scorpion");
    //     setTraversedHouses((prev) => [...prev, "scorpion"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.5) {
    //   if (!traversedHouses.includes("balance")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("balance");
    //     setTraversedHouses((prev) => [...prev, "balance"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.4) {
    //   if (!traversedHouses.includes("vierge")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("vierge");
    //     setTraversedHouses((prev) => [...prev, "vierge"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.3) {
    //   if (!traversedHouses.includes("lion")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("lion");
    //     setTraversedHouses((prev) => [...prev, "lion"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.2) {
    //   if (!traversedHouses.includes("cancer")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("cancer");
    //     setTraversedHouses((prev) => [...prev, "cancer"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (currentScore >= 0.1) {
    //   if (!traversedHouses.includes("gemeaux")) {
    //     setEntersHouse(true);
    //     setCurrentHouse("gemeaux");
    //     setTraversedHouses((prev) => [...prev, "gemeaux"]);
    //     return;
    //   }
    //   setEntersHouse(false);
    //   return;
    // }
    // if (correctCount >= 1) {
    //   setEntersHouse(true);
    //   setCurrentHouse(() => "taureau");
    //   const traversed = [...traversedHouses, "taureau" as House];
    //   setTraversedHouses(traversed);
    //   window.localStorage.setItem(
    //     "sanctuary",
    //     JSON.stringify({ currentHouse: "taureau", traversedHouses: traversed, entersHouse: true })
    //   );
    // }
    if (correctCount >= 1) {
      console.log(traversedHouses);
      console.log(traversedHouses?.includes("taureau"));
      if (traversedHouses === null) return;
      if (!traversedHouses.includes("taureau")) {
        setEntersHouse(true);
        setCurrentHouse(() => "taureau");
        const traversed = [...traversedHouses, "taureau" as House];
        setTraversedHouses(traversed);
        window.localStorage.setItem(
          "sanctuary",
          JSON.stringify({ currentHouse: "taureau", traversedHouses: traversed, entersHouse: true })
        );
        return;
      }
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    // window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse }));
  }

  function getHouseParticle(house: House) {
    switch (house) {
      case "belier":
        return "du";
      case "taureau":
        return "du";
      case "gemeaux":
        return "des";
      case "cancer":
        return "du";
      case "lion":
        return "du";
      case "vierge":
        return "de la";
      case "balance":
        return "de la";
      case "scorpion":
        return "du";
      case "sagittaire":
        return "du";
      case "capricorne":
        return "du";
      case "verseau":
        return "du";
      case "poissons":
        return "des";
    }
  }

  return { reset, entersHouse, currentHouse, getHouseParticle, updateCurrentHouse, updateSanctuaryHouses };
}
