"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import GameText from "./gameText";
import GameOptions from "./gameOptions";
import { useEffect, useState } from "react";
import { TextSkeleton } from "./textSkeleton";
import { OptionsSkeleton } from "./optionsSkeleton";

export function Game({ id, start }: { id: string, start: string }) {
  const [story, setStory] = useState('');
  const [choices, setChoices] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPending, error, data } = useQuery({
    queryKey: ["game", id, start],
    queryFn: async () => {
      const res = await fetch(`/api/game/chat/${id}/start`, {
        method: "POST",
        body: JSON.stringify({ start }),
      })
      return res.json()
    }
  });

  const mutation = useMutation({
    mutationFn: async (choice: string) => {
      const res = await fetch(`/api/game/chat/${id}`, {
        method: "POST",
        body: JSON.stringify({ choice }),
      })
      return res.json()
    },
    onSuccess: (data) => {
      console.log(data);
      setStory(data.story);
      setChoices(data.choices);
    }
  });

  useEffect(() => {
    setLoading(isPending || mutation.isPending);
  }, [isPending, mutation.isPending]);

  useEffect(() => {
    console.log(data);
    const {story, choices} = data ?? {};
    setStory(story);
    setChoices(choices);
  }, [data]);

  const onClickOption = (option: string) => {
    console.log(option);
    mutation.mutate(option);
  }

  // const {story} = data ?? {};

  return (
    <main className="mx-auto flex h-screen w-full flex-col justify-center gap-4 p-8">
      {loading && <TextSkeleton />}
      {(!loading && story) && <GameText text={story} />}
      {loading && <OptionsSkeleton />}
      {(!loading && choices) && <GameOptions choices={choices} onClickOption={onClickOption}/>}
    </main>
  );
}
