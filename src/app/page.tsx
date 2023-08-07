"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import { motion, useIsPresent } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState, SetStateAction } from "react";
import Image from "next/image";
import picture from "../../public/download.jpeg";
import { NanaQuipping, KomiQuipping } from "@/components/QuippingCharaters";
import chad from "../../public/chad.png";
import { getVoteItem, setVoteItem } from "@/utils/Action";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { VoteItem } from "@/utils/type";

export default function Home() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [clicked, setclicked] = useState<VoteItem>({
    love: false,
    fire: false,
    meh: false,
    chad: false,
    angry: false,
  });
  const [voteCount, setvoteCount] = useState<VoteItem>({
    love: 0,
    fire: 0,
    meh: 0,
    chad: 0,
    angry: 0,
  });

  const handleVoteClick = (type: string) => {
    if (isUpdating) return; // Ignore clicks while updating

    setIsUpdating(true); // Set updating flag

    const newClicked = { ...clicked, [type]: !clicked[type] };
    setclicked(newClicked);
    setVoteItem("vote", newClicked);

    if (clicked[type]) {
      setvoteCount((prev) => {
        setReactions({ ...prev, [type]: prev[type] - 1 });
        return { ...prev, [type]: prev[type] - 1 };
      });
    } else {
      setvoteCount((prev) => {
        setReactions({ ...prev, [type]: prev[type] + 1 });
        return { ...prev, [type]: prev[type] + 1 };
      });
    }

    // Reset updating flag after a short delay
    setTimeout(() => setIsUpdating(false), 500);
  };

  // ...

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
  useEffect(() => {
    getReactions().then((data) => {
      if (data) setvoteCount(data[0]);
    });
  }, []);
  useEffect(() => {
    const supabase = createClientComponentClient();
    const Reactions = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Reactions" },
        (payload) => {
          if (payload) setvoteCount(payload.new);
          console.log("Change received!", payload);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(Reactions);
    };
  }, []);
  useEffect(() => {
    const voted = JSON.parse(getVoteItem("vote"));
    if (voted != null) {
      setclicked(voted);
    }
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
              }`}
              className={`btn border border-black dark:border-white ${
                clicked.love && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.love}
              onClick={() => handleVoteClick("love")}
              disabled={isUpdating}
            >
              <Image
                alt="Heart-emoji"
                src="https://img.icons8.com/cotton/64/like--v1.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>{voteCount.love}</span>
            </button>
            <button
              aria-label={`${
                clicked.fire ? "Fire selected" : "Fire not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.fire && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.fire}
              onClick={() => handleVoteClick("fire")}
            >
              <Image
                alt="Fire-emoji"
                src="https://img.icons8.com/emoji/48/fire.png"
                width="20"
                height="20"
                decoding="async"
                data-nimg="future"
                loading="lazy"
                style={{ color: "transparent;" }}
              />
              <span>{voteCount.fire}</span>
            </button>
            <button
              aria-label={`${
                clicked.meh ? "Meh selected" : "Meh not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.meh && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.meh}
              onClick={() => handleVoteClick("meh")}
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
              <span>{voteCount.meh}</span>
            </button>
            <button
              aria-label={`${
                clicked.angry ? "Angry selected" : "Angry not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.angry && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.angry}
              onClick={() => handleVoteClick("angry")}
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
              <span>{voteCount.angry}</span>
            </button>
            <button
              aria-label={`${
                clicked.chad ? "chad selected" : "chad not selected"
              }?`}
              className={`btn border border-black dark:border-white ${
                clicked.chad && "bg-blue-600 text-slate-100 "
              } hover:bg-purple-600 hover:text-slate-100  p-2 flex flex-col items-center gap-2 rounded-md`}
              data-clicked={clicked.chad}
              onClick={() => handleVoteClick("chad")}
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
              <span>{voteCount.chad}</span>
            </button>
          </div>
          <div className="hidden md:block">
            <NanaQuipping />
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-center">
        <h1 className="text-center">Made with ❤️ (& tears) by Shehu</h1>
      </footer>
    </main>
  );
}

const getReactions = async () => {
  let supabase = createClientComponentClient();

  let { data } = await supabase.from("Reactions").select("*");
  return data;
};
const setReactions = async (info: any) => {
  let supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("Reactions")
    .update(info)
    .eq("id", 1);
  return data ? data : error;
};


