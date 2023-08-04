"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import Link from "next/link";
import { useState } from "react";
// import { MotionValue, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// function useParallax(value: MotionValue<number>, distance: string) {
//   return useTransform(value, [0, 1], ["-" + distance, distance]);}

interface Props {
  alt: string;
  category: string;
  index: number;
  aspectRatio: string;
}

export default function Home() {
  const [clubs, setClubs] = useState([
    "Arsenal",
    "Aston Villa",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Leeds United",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Norwich City",
    "Southampton",
    "Tottenham Hotspur",
    "Watford",
    "West Ham United",
    "Wolverhampton Wanderers",
  ]);

  return (
    <main
      className="w-full main flex flex-col items-center"
      scroll-direction="up"
    >
      {" "}
      {/* <div id="progress"></div> */}
      <nav id="navbar" className=" w-full flex justify-center sticky  ">
        <div className=" come-in w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <h2 className="">Logo</h2>
          <ColorSwitcher />
        </div>
      </nav>
      <h1 className=" text-center">Hello</h1>
      <Link href={"/play-game"} as={"/play-game"}>
        play game
      </Link>
      <div className=" max-h-96 overflow-auto m-8 border-4 border-cyan-950">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="  come-in m-4 p-4 bg-blue-500 text-white rounded shadow"
          >
            {club}
          </div>
        ))}
      </div>
      <div className=" max-h-96 overflow-auto m-8 border-4 border-cyan-950">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="  come-in m-4 p-4 bg-blue-500 text-white rounded shadow"
          >
            {club}
          </div>
        ))}
      </div>
      <div className=" max-h-96 overflow-auto m-8 border-4 border-cyan-950">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="  come-in m-4 p-4 bg-blue-500 text-white rounded shadow"
          >
            {club}
          </div>
        ))}
      </div>
      <div className=" max-h-96 overflow-auto m-8 border-4 border-cyan-950">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="  come-in m-4 p-4 bg-blue-500 text-white rounded shadow"
          >
            {club}
          </div>
        ))}
      </div>
    </main>
  );
}
