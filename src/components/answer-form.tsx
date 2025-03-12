"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Anime } from "@/types";
import { checkAnswer, errorPrimaryMessage, errorSecondaryMessage, imagePrefix, videoUrlToEmbed } from "@/lib/utils";
import { useState } from "react";
import { useAnimeStatus } from "@/hooks/useAnimeStatus";
import { ChevronRight, Frown, SearchCheck, Trophy } from "lucide-react";
import { useDragonBalls } from "@/hooks/useDragonBalls";
import { useHiddenDragonBalls } from "@/hooks/useHiddenDragonBalls";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSanctuary } from "@/hooks/useSanctuary";

const formSchema = z.object({
  answer: z
    .string()
    .min(1, { message: "Aucun dessin animé n'a un titre aussi court !" })
    .max(50, { message: "Aucun dessin animé n'a un titre aussi long !" }),
});

export default function AnswerForm({ anime }: { anime: Anime }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDragonBallModal, setShowDragonBallModal] = useState(false);
  const [animeStatus, updateStatus] = useAnimeStatus();
  const { updateSanctuaryHouses } = useSanctuary();
  const { updateDragonBallCollection } = useDragonBalls();
  const hiddenDragonBalls = useHiddenDragonBalls();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { answer: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    const success = checkAnswer(anime, values.answer);
    if (success) {
      setIsSuccess(true);

      if (animeStatus[anime.id] === "correct") return;

      updateStatus(anime.id, "correct");

      updateSanctuaryHouses();

      updateDragonBallCollection(anime.index);
      if (hiddenDragonBalls[anime.index]) {
        setShowDragonBallModal(true);
      }
    } else {
      setIsSuccess(false);
      updateStatus(anime.id, "wrong");
    }
  }

  const isFound = animeStatus[anime.id] === "correct" || isSuccess;

  if (isFound) {
    return (
      <div className="flex flex-col gap-12">
        <div className="flex gap-4">
          <Trophy className="size-12 text-yellow-500" />
          <p className="text-5xl font-bold">Bravo !</p>
        </div>
        <p className="text-7xl font-black">{anime.title}</p>
        {anime.videoUrl && (
          <div className="">
            <iframe
              src={videoUrlToEmbed(anime.videoUrl)}
              width="560"
              height="315"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <AlertDialog open={showDragonBallModal} onOpenChange={setShowDragonBallModal}>
          <AlertDialogContent className="flex flex-col">
            <AlertDialogHeader className="justify-self-center">
              <AlertDialogTitle className="text-center text-2xl">Bravo !</AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                Tu as trouvé la boule à {hiddenDragonBalls[anime.index]} étoiles !
                <Image
                  className="justify-self-center"
                  src={
                    imagePrefix() +
                    `assets/images/dragon-ball_${hiddenDragonBalls[anime.index]}-etoile${
                      hiddenDragonBalls[anime.index] === "1" ? "" : "s"
                    }.png`
                  }
                  alt="Radar"
                  width={200}
                  height={200}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="grid grid-cols-2">
              <AlertDialogCancel>Retourner au quizz</AlertDialogCancel>
              <AlertDialogAction onClick={() => router.push("/board")}>
                Aller voir ma collection
                <ChevronRight className="size-4" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
                <FormLabel className="text-2xl font-bold">Quel est ce dessin animé ?</FormLabel>
                <FormControl>
                  <Input
                    className="text-2xl md:text-2xl p-8"
                    placeholder="Ma réponse"
                    type="string"
                    // autoComplete="off"
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    onFocus={() => setSubmitted(false)}
                  />
                </FormControl>
                <FormDescription>Il s&apos;agit du titre français</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-2xl font-bold px-12 py-8" type="submit">
            Vérifier
            <SearchCheck className="size-8 mr-2" />
          </Button>
        </form>
      </Form>

      {submitted && (
        <div className="grid grid-cols-[min-content_1fr] gap-4 content-start">
          <Frown className="size-10 text-red-500" />
          <p className="text-4xl font-bold">{errorPrimaryMessage()}</p>
          <p className="text-2xl col-start-2">{errorSecondaryMessage()}</p>
          <p className="text-2xl col-start-2 font-bold">Essaye encore !</p>
        </div>
      )}
    </div>
  );
}
