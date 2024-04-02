"use client";

export default function GameOptions({
  choices,
  onClickOption,
}: {
  choices: { [key: string]: string };
  onClickOption: (option: string) => void;
}) {
  console.log(choices);
  return (
    <div className="grid h-1/3 w-full grid-cols-2 grid-rows-2 gap-2">
      {Object.entries(choices).map(([key, value]) => (
        <div
          className="h-full w-full bg-gray-200 p-4 hover:bg-gray-300"
          key={key}
          onClick={() => onClickOption(key)}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
