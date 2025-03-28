"use client";

import { useEffect, useState } from "react";
import { NewGameButton } from "./new-game-button";
import { ResumeGameButton } from "./resume-game-button";

export function HomePageButtonBar() {
  const [alreadyStarted, setAlreadyStarted] = useState(false);

  useEffect(() => {
    const started = window.localStorage.getItem("anime-quizz.status") !== null;
    setAlreadyStarted(started);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <NewGameButton alreadyStarted={alreadyStarted} />
      <ResumeGameButton alreadyStarted={alreadyStarted} />
    </div>
  );
}
