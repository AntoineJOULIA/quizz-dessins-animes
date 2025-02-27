"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Anime } from "@/types";
import { checkAnswer } from "@/lib/utils";
import { useState } from "react";
import { useAnswers } from "@/hooks/useAnswers";
import { Frown, Trophy } from "lucide-react";

const formSchema = z.object({
  answer: z.string().min(1),
});

export default function AnswerForm({ anime }: { anime: Anime }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { correctAnswers, addAnswer } = useAnswers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { answer: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    const success = checkAnswer(anime, values.answer);
    if (success) {
      setIsSuccess(true);

      if (correctAnswers.includes(anime.id)) return;

      addAnswer(anime.id);
    } else {
      setIsSuccess(false);
    }
  }

  const isFound = correctAnswers.includes(anime.id) || isSuccess;

  if (isFound) {
    return (
      <div className="flex flex-col gap-12">
        <div className="flex gap-4">
          <Trophy className="size-12 text-yellow-500" />
          <p className="text-5xl font-bold">Bravo !</p>
        </div>
        <p className="text-7xl font-black">{anime.title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl font-bold">Réponse</FormLabel>
                <FormControl>
                  <Input
                    className="text-2xl md:text-2xl p-8"
                    placeholder="Ma réponse"
                    type="string"
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    onFocus={() => setSubmitted(false)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-2xl font-bold px-12 py-8" type="submit">
            Vérifier
          </Button>
        </form>
      </Form>

      {submitted && (
        <div className="grid grid-cols-[min-content_1fr] gap-4 content-start">
          <Frown className="size-10 text-red-500" />
          <p className="text-4xl font-bold">Mauvaise réponse !</p>
          <p className="text-2xl col-start-2">Essaye encore !</p>
        </div>
      )}
    </div>
  );
}
