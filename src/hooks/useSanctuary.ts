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
  const [traversedHouses, setTraversedHouses] = useState<House[] | null>(null);
  const [entersHouse, setEntersHouse] = useState(false);
  const totalCount = getAnimes().length;
  const correctCount = Object.values(animeStatus).filter((status) => status === "correct").length;
  const currentScore = correctCount / totalCount;

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
    if (correctCount >= totalCount - 5) {
      const hasEntered = enters("poissons");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.9) {
      const hasEntered = enters("verseau");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.8) {
      const hasEntered = enters("capricorne");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.7) {
      const hasEntered = enters("sagittaire");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.6) {
      const hasEntered = enters("scorpion");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.5) {
      const hasEntered = enters("balance");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.4) {
      const hasEntered = enters("vierge");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.3) {
      const hasEntered = enters("lion");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.2) {
      const hasEntered = enters("cancer");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (currentScore >= 0.1) {
      const hasEntered = enters("gemeaux");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
    if (correctCount >= 1) {
      const hasEntered = enters("taureau");
      if (hasEntered) return;
      setEntersHouse(false);
      window.localStorage.setItem("sanctuary", JSON.stringify({ currentHouse, traversedHouses, entersHouse: false }));
      return;
    }
  }

  function enters(house: House) {
    if (traversedHouses === null) return false;
    if (!traversedHouses.includes(house)) {
      setEntersHouse(true);
      setCurrentHouse(() => house);
      const traversed = [...traversedHouses, house];
      setTraversedHouses(traversed);
      window.localStorage.setItem(
        "sanctuary",
        JSON.stringify({ currentHouse: house, traversedHouses: traversed, entersHouse: true })
      );
      return true;
    }
    return false;
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
