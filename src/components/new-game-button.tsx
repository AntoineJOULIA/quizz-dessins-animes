"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function NewGameButton() {
  const router = useRouter();

  function handleClick() {
    window.localStorage.removeItem("quizz-status");
    router.push("/1");
  }

  return (
    <Button size={"lg"} className="text-2xl font-bold px-12 py-8" onClick={handleClick}>
      Nouvelle partie
    </Button>
  );
}
