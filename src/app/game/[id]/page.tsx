import { Game } from "@/components/game/game";

export default function GamePlay({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {[key: string]: string | undefined};
}) {
  const { id } = params;
  const { start = '' } = searchParams || {};

  return (
      <Game id={id} start={start}/>
  );
}
