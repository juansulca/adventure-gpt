import { useState, useEffect } from "react";

function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => `${prev}${text.charAt(index)}`);
      index += 1;
      if (index === text.length) clearInterval(timer);
    }, 60);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="typing-effect text-lg text-gray-800">{displayedText}</div>
  );
}

export default function GameText({ text }: { text: string }) {
  return (
    <div className="flex h-2/3 w-full items-center justify-center border rounded-lg p-4">
      {/* <TypingText text={text} /> */}
      {text}
    </div>
  );
}
