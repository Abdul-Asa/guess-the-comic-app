"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // delay time in milliseconds

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className=" text-center">Hello</h1>
      <div
        className={`transform transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        This div will slide in from the bottom and fade in when the page loads.
      </div>
      <Link href={"/play-game"} as={"/play-game"}>
        play game
      </Link>
    </main>
  );
}
