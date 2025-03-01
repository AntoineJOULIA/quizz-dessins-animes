"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Tv } from "lucide-react";

export function NewGameButton() {
  const router = useRouter();

  function handleClick() {
    window.localStorage.removeItem("quizz-status");
    router.push("/1");
  }

  return (
    <Button className="text-2xl font-bold px-12 py-8" onClick={handleClick}>
      <Tv className="h-8 w-8 mr-4" />
      Nouvelle partie
    </Button>
  );
}
