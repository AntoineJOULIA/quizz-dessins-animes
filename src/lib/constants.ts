import { House } from "@/hooks/useSanctuary";

const LOCAL_STORAGE_PREFIX = "anime-quizz";
const LOCAL_STORAGE_RAW_KEYS = ["status", "sanctuary", "dragon-balls", "hidden-dragon-balls", "granted-shenron-wish"];
export const LOCAL_STORAGE_KEYS = LOCAL_STORAGE_RAW_KEYS.map((key) => `${LOCAL_STORAGE_PREFIX}.${key}`);

export const SANCTUARY_HOUSES_THRESHOLDS: { [Property in House]: number } = {
  belier: 1,
  taureau: process.env.NODE_ENV === "production" ? 5 : 2,
  gemeaux: 0.1,
  cancer: 0.2,
  lion: 0.3,
  vierge: 0.4,
  balance: 0.5,
  scorpion: 0.6,
  sagittaire: 0.7,
  capricorne: 0.8,
  verseau: 0.9,
  poissons: process.env.NODE_ENV === "production" ? 5 : 2,
  pope: 1,
};

export const COLORS: string[] = ["zinc", "red", "rose", "orange", "green", "blue", "yellow", "violet"] as const;
