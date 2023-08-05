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
      className="w-full main flex flex-col items-center"
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
      <div className="w-full max-w-5xl flex justify-around gap-12 items-center flex-col md:flex-row">
        <Link
          href="/play-game"
          as={"/play-game"}
          className="group w-full mt-4 transition duration-300"
        >
          <div className="bg-blue-600 grid grid-cols-3 hover:bg-purple-600 border border-black dark:border-white text-white h-10 md:h-40 w-full justify-center transition-colors duration-200 ease-out">
            <div className="flex flex-col col-span-2 space-y-4">
              <div className="flex-1">Play random games</div>
              <div className="flex-1">
                Play →
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </div>
            <div className=" col-span-1">💀 </div>
          </div>
        </Link>
        <Link
          href="/play-game"
          as={"/play-game"}
          className="group w-full mt-4 transition duration-300"
        >
          <div className="hover:bg-blue-600 border border-white h-10 md:h-40 w-full justify-center flex items-center transition-colors duration-200 ease-out">
            Play
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
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