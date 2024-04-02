import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export default function GameStart() {
  async function start(formData: FormData) {
    'use server';
    const id = nanoid();
    const startText = formData.get('start-with') ?? '';
    console.log(startText);
    return redirect(`/game/${id}?start=${encodeURIComponent(startText)}`);
  }

  return (
    <form action={start} className="mx-auto flex h-screen w-1/3 flex-col justify-center gap-4 p-8">
      <Label htmlFor="start-with">Pick the beggining of your story:</Label>
      <Input
        type="text"
        placeholder="A long time ago in a galaxy far, far away"
        name="start-with"
      />
      <Button type="submit">Start</Button>
    </form>
  );
}
