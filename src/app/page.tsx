"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

export default function Home() {
  // const lineRef = useRef(null);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (lineRef.current) {
  //       const section = lineRef.current.parentElement;
  //       const sectionTop = section.offsetTop;
  //       const sectionHeight = section.offsetHeight;
  //       const scrollPosition = window.scrollY;
  //       const progress = Math.min(
  //         Math.max((scrollPosition - sectionTop) / sectionHeight, 0),
  //         1
  //       );
  //       lineRef.current.style.setProperty(
  //         "--line-height",
  //         `${progress * 100}%`
  //       );
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <main
      className="w-full main flex flex-col items-center bg-custom-gray dark:bg-custom-black"
      scroll-direction="up"
    >
      <div id="progress" className=" bg-black dark:bg-white"></div>
      <nav
        id="navbar"
        className=" w-full flex sticky come-in max-w-5xl justify-between items-center p-3 text-sm text-foreground"
      >
        <h2 className="">Logo</h2>
        <ColorSwitcher />
      </nav>
      <header className=" m-24 md:m-36 max-w-5xl ">
        <h1 className=" text-5xl md:text-7xl font-extrabold tracking-tight text-center">
          Guess <span className="text-blue-600">the Comic</span>
        </h1>
      </header>
      <div className="w-full max-w-5xl flex justify-around gap-12 p-4 items-center flex-col md:flex-row">
        <Link
          href="/play-game"
          as={"/play-game"}
          className="group w-full mt-4 transition duration-300"
        >
          <div className="bg-blue-600 p-4 grid grid-cols-3 hover:bg-purple-600 border border-black dark:border-white text-white h-40 w-full justify-center transition-colors duration-200 ease-out">
            <div className="flex flex-col w-full col-span-2 space-y-4">
              <div className="flex-1">
                Guess from a random mix of Webtoons, Manga, and Manhwa!
              </div>
              <div className="flex-1 w-full">
                <div className="w-full w-max-64 items-center flex">
                  <b className="font-black text-3xl">Play</b>
                  <span className="ml-4 w-4 transition-transform lg:group-hover:translate-x-52 duration-500 ">
                    <b>→</b>
                  </span>
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </div>
            <div className=" col-span-1 flex items-center justify-center">
              <h1 className="text-3xl">🚀</h1>
            </div>
          </div>
        </Link>
        <Link
          href="/play-daily"
          as={"/play-daily"}
          className="group w-full mt-4 transition duration-300"
        >
          <div className="bg-blue-600 p-4 grid grid-cols-3 hover:bg-purple-600 border border-black dark:border-white text-white h-40 w-full justify-center transition-colors duration-200 ease-out">
            <div className="flex flex-col w-full col-span-2 space-y-4">
              <div className="flex-1">
                Daily Challenge – A New Comic to Guess Every Day!
              </div>
              <div className="flex-1 w-full">
                <div className="w-full w-max-64 items-center flex">
                  <b className="font-black text-3xl">Play</b>
                  <span className="ml-4 w-4 transition-transform lg:group-hover:translate-x-52 duration-500 ">
                    <b>→</b>
                  </span>
                </div>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </div>
            <div className=" col-span-1 flex items-center justify-center">
              <h1 className="text-3xl">📅</h1>
            </div>
          </div>
        </Link>
      </div>
      <header className=" m-24 md:m-36 max-w-5xl ">
        <h1 className=" text-5xl md:text-7xl font-extrabold tracking-tight text-center">
          How <span className="text-blue-600">to play</span>
        </h1>
      </header>
      <section className=" relative w-full max-w-5xl flex justify-around gap-12 p-4 items-center flex-col">
        <div
          // ref={lineRef}
          className="absolute h-full w-1 bg-red-500 grow-timeline"
        ></div>
        <div className="h-40 w-full bg-yellow-300"></div>
        <div className="h-40 w-full bg-yellow-300"></div>
        <div className="h-40 w-full bg-yellow-300"></div>
        <div className="h-40 w-full bg-yellow-300"></div>
        <div className="h-40 w-full bg-yellow-300"></div>
      </section>
    </main>
  );
}
// "--base-width": "24vw",
// top: "-18vw",
// letterSpacing: "-1.4vw",
// x: "-50%"