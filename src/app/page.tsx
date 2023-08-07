"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import picture from "../../public/download.jpeg";
import meme1 from "../../public/meme2.gif";
import meme2 from "../../public/meme.gif";
import chad from "../../public/chad.png";

export default function Home() {
  const [clicked, setclicked] = useState({
    love: false,
    fire: false,
    meh: false,
    chad: false,
    angry: false,
  });

  const lineRef = useRef<HTMLDivElement>(null); // Specify the type here
  useEffect(() => {
    const handleScroll = () => {
      if (lineRef.current) {
        const section = lineRef.current.parentElement;
        const sectionTop = section?.offsetTop;
        const sectionHeight = section?.offsetHeight;
        const scrollPosition = window.scrollY;
        const progress = Math.min(
          Math.max((scrollPosition - sectionTop!) / sectionHeight!, 0),
          1
        );
        lineRef.current.style.setProperty(
          "--line-height",
          `${progress * 100}%`
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="w-full main h-full flex flex-col items-center bg-custom-gray dark:bg-custom-black"
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

      <section className=" relative w-full max-w-5xl flex justify-around gap-12 mb-12 p-4 items-center flex-col">
        <header className=" m-24 md:m-36 ">
          <h1 className=" text-5xl md:text-7xl font-extrabold tracking-tight text-center">
            How <span className="text-blue-600">to play</span>
          </h1>
        </header>
        <div className="relative w-full max-w-5xl flex justify-around gap-12 p-4 items-center flex-col">
          <div
            ref={lineRef}
            className="absolute flex-col justify-between w-2 top-0 hidden md:flex  bg-custom-black dark:bg-custom-gray grow-timeline"
          />

          <div className="h-40 w-full flex justify-between come-in ">
            <Image
              className="revealing-image"
              src={picture}
              height={90}
              width={200}
              alt={"pic"}
            />
            <div>
              <h1 className="self-center text-3xl text-center max-w-xs">
                Choose your challenge
              </h1>
              <ul>
                <li>Play random</li>
                <li>Play Daily</li>
              </ul>
            </div>
          </div>
          <div className="h-40 w-full flex justify-between come-in flex-row-reverse ">
            <Image
              className="revealing-image"
              src={picture}
              height={90}
              width={200}
              alt={"pic"}
            />
            <h1 className="self-center text-3xl text-center max-w-xs">
              Make your 6 guesses count
            </h1>
          </div>
          <div className="h-40 w-full flex justify-between come-in ">
            <Image
              className="revealing-image"
              src={picture}
              height={90}
              width={200}
              alt={"pic"}
            />
            <div>
              <h1 className="self-center text-3xl text-center max-w-xs">
                Challenge feature coming soon
              </h1>
              <h2>Find out who has the better knowledge</h2>
            </div>
          </div>
        </div>
        <h1>
          Ideas, suggestions, comments or just wanna say thank you? Just reach
          out
        </h1>
        <ul className="flex flex-row gap-4">
          <li>Twitter</li>
          <li>Github</li>
          <li>Discord</li>
          <li>Linkden</li>
          <li>Email</li>
        </ul>
        <h1>
          Have fun exploring and guessing different comics and don't forget to
          Share the game with friends .
        </h1>
        <pre
          className="asciiArt text-left m-0"
          aria-label="An ASCII art of bunny holding a sign saying ‘How does this website make you feel?’"
        >
          =-=-=-=-=-=-=-=-=-=-=- <br />
          | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp;| <br />
          |&nbsp;&nbsp; &nbsp;&nbsp;HOW DOES &nbsp; &nbsp; &nbsp; | <br />
          | &nbsp; THIS WEBSITE &nbsp; &nbsp; | <br />
          | &nbsp; MAKE YOU FEEL? &nbsp; | <br />
          | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp;| <br />
          =-=-=-=-=-=-=-=-=-=-=- <br />
          (\__/) || <br />
          (•ㅅ•) || <br />/ 　 づ
        </pre>
        <div className="flex w-full justify-evenly p-2 mb-8">
          <div className="hidden md:block">
            <KomiQuipping />
          </div>
          <div className="flex flex-row gap-4 p-2">
            <button
              aria-label={`${
                clicked.love ? "Heart selected" : "Heart not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.love && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.love}
              onClick={() => {
                console.log(clicked);
                setclicked((prev) => ({ ...prev, love: !prev.love }));
              }}
            >
              <Image
                alt=""
                src="https://img.icons8.com/cotton/64/like--v1.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>115</span>
            </button>
            <button
              aria-label={`${
                clicked.fire ? "Fire selected" : "Fire not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.fire && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.fire}
              onClick={() => {
                console.log(clicked);
                setclicked((prev) => ({ ...prev, fire: !prev.fire }));
              }}
            >
              <Image
                alt="Heart-emoji"
                src="https://img.icons8.com/emoji/48/fire.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>115</span>
            </button>
            <button
              aria-label={`${
                clicked.meh ? "Meh selected" : "Meh not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.meh && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.meh}
              onClick={() => {
                console.log(clicked);
                setclicked((prev) => ({ ...prev, meh: !prev.meh }));
              }}
            >
              <Image
                alt="meh-emoji"
                src="https://img.icons8.com/cotton/64/face-with-rolling-eyes-icon--v2.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>115</span>
            </button>
            <button
              aria-label={`${
                clicked.angry ? "Angry selected" : "Angry not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.angry && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.angry}
              onClick={() => {
                console.log(clicked);
                setclicked((prev) => ({ ...prev, angry: !prev.angry }));
              }}
            >
              <Image
                alt="face-with-symbols-on-mouth"
                src="https://img.icons8.com/emoji/48/face-with-symbols-on-mouth.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>115</span>
            </button>
            <button
              aria-label={`${
                clicked.chad ? "chad selected" : "chad not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.chad && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.chad}
              onClick={() => {
                console.log(clicked);
                setclicked((prev) => ({ ...prev, chad: !prev.chad }));
              }}
            >
              <Image
                alt="face-with-symbols-on-mouth"
                src={chad}
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>115</span>
            </button>
          </div>
          <div className="hidden md:block">
            <NanaQuipping />
          </div>{" "}
        </div>
      </section>
      <footer className="flex items-center justify-center">
        <h1 className="text-center">Made with ❤️ (& tears) by Shehu</h1>
      </footer>
    </main>
  );
}

const NanaQuipping = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const quips = [
    "Did you know that honey never spoils? Just like my love for my friends, it lasts forever! 🍯",
    "I tried cooking for the first time today. Let's just say the fire department and I are now on a first-name basis! 🔥",
    "A group of flamingos is called a 'flamboyance.' I think I've found my spirit animal! 💃",
    "I tried to catch some fog today, but I mist! Get it? Mist? I crack myself up! 🌫️",
    "Wombat poop is cube-shaped! Nature sure has a weir sense of humor, doesn't it? 💩",
    "Did you know that the human brain uses the same amount of power as a 10-watt light bulb?  So keep yours shining bright by studying hard! 💡",
    "A group of owls is called a 'parliament.' Just like us quintuplets, they must have a lot to discuss! 🦉",
    "I heard that a snail can sleep for three years. I wish I could do that, especially during exam season! 🐌",
    "A single strand of spaghetti is called a 'spaghetto.' It's funny how something so simple can have such a fancy name, isn't it? 🍝",
  ];

  useEffect(() => {
    const changeQuip = () => {
      setIsVisible(false);
      setTimeout(() => {
        setQuipIndex((prevIndex) => (prevIndex + 1) % quips.length);
        setIsVisible(true);
      }, 5000);
    };

    const interval = setInterval(changeQuip, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center">
      <Image className="gif" src={meme2} height={50} width={50} alt={"pic"} />
      <div className={`speech-box ${isVisible ? "" : "fade-out"}`}>
        <div className="speech-bubble absolute left-[60px] top-[-10px] bg-white text-black p-2 rounded-md shadow-md">
          <p>{quips[quipIndex]}</p>
        </div>
      </div>
    </div>
  );
};

const KomiQuipping = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const quips = ["💃🏼", "❤️", "🤭", "🗿", "😒", "👉🏼🚪"];

  const handleClick = () => {
    setIsVisible(true);
    setQuipIndex((prevIndex) => (prevIndex + 1) % quips.length);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  return (
    <div className="relative flex items-center" onClick={handleClick}>
      <div className={`speech-box ${isVisible ? "" : "fade-out"}`}>
        <div className="overflow-scroll w-12 absolute right-[60px] top-[-10px] bg-white text-black p-2 rounded-md shadow-md">
          <p className="text-center">{quips[quipIndex]}</p>
        </div>
      </div>
      <Image className="gif" src={meme1} height={50} width={50} alt={"pic"} />
    </div>
  );
};
