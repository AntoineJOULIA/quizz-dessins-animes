import { useEffect, useState } from "react";

export function useAnswers() {
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  useEffect(() => {
    const storedAnswers = window.localStorage.getItem("quizz-anime");
    if (storedAnswers) {
      setCorrectAnswers(storedAnswers.split(","));
    }
  }, []);

  function addAnswer(animeId: string) {
    const results = [...correctAnswers, animeId];
    setCorrectAnswers(results);
    window.localStorage.setItem("quizz-anime", results.join(","));
  }

  return { correctAnswers, addAnswer };
}
