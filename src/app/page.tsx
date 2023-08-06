"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const isPresent = useIsPresent();
  const pathname = usePathname();
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
          <div className="bg-blue-600 p-4 grid grid-cols-3 hover:bg-purple-600 border border-black dark:border-white text-white h-fit md:h-40 w-full justify-center transition-colors duration-200 ease-out">
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
          <div className="bg-blue-600 p-4 grid grid-cols-3 hover:bg-purple-600 border border-black dark:border-white text-white h-fit md:h-40 w-full justify-center transition-colors duration-200 ease-out">
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
    </main>
  );
}
// "--base-width": "24vw",
// top: "-18vw",
// letterSpacing: "-1.4vw",
// x: "-50%"