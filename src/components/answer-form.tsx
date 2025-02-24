"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Anime } from "@/types";
import { checkAnswer } from "@/lib/utils";

const formSchema = z.object({
  answer: z.string().min(1),
});

export default function AnswerForm({ anime }: { anime: Anime }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const success = checkAnswer(anime, values.answer);
    if (success) {
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse !");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réponse</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ma réponse"
                  type="string"
                  {...field}
                  onChange={(event) => field.onChange(event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Soumettre</Button>
      </form>
    </Form>
  );
}
