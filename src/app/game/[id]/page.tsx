import { Game } from "@/components/game/game";
import { Title } from "@/components/title";

export default function GamePlay({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | undefined };
}) {
  const { id } = params;
  const { start = "" } = searchParams || {};

  return (
    <>
      <Title />
      <Game id={id} start={start} />
    </>
  );
}
