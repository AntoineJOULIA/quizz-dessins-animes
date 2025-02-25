"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function NewGameButton() {
  const router = useRouter();

  function handleClick() {
    window.localStorage.removeItem("quizz-anime");
    router.push("/1");
  }

  return <Button onClick={handleClick}>Nouvelle partie</Button>;
}
