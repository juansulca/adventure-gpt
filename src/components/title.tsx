'use client';
import Link from "next/link";
import { Button } from "./ui/button";

export function Title() {
  return (
    <header className="w-full flex justify-between items-center p-8">
      <h1 className="text-4xl">Adventure GPT</h1>
      <Button><Link href="/game">Take me out of here</Link></Button>
    </header>
  );
}
