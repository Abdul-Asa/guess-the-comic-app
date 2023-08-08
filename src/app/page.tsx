"use client";
import { ColorSwitcher } from "@/components/ColorSwitch";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/download.png";
import gif1 from "../../public/gif1.gif";
import gif2 from "../../public/gif2.gif";
import gif3 from "../../public/ezgif.com-video-to-gif.gif";
import { NanaQuipping, KomiQuipping } from "@/components/QuippingCharacters";
import chad from "../../public/chad.png";
import { getKeyItem, setKeyItem } from "@/utils/Action";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { VoteItem } from "@/utils/type";
import Marker from "@/components/Hand-drawn-circle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyToClipboard from "react-copy-to-clipboard";

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
  const notify = () => toast("Link copied to clipboard!");
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const handleVoteClick = (type: string) => {
    if (isUpdating) return; // Ignore clicks while updating

    setIsUpdating(true); // Set updating flag

    const newClicked = { ...clicked, [type]: !clicked[type] };
    setclicked(newClicked);
    setKeyItem("vote", newClicked);

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
    const voted = JSON.parse(getKeyItem("vote"));
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
        <a href="/">
          <Image
            alt="face-with-symbols-on-mouth"
            src={logo}
            width="20"
            height="20"
            decoding="async"
            data-nimg="future"
            loading="lazy"
            style={{ color: "transparent;" }}
          />
        </a>

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
      <section className=" relative w-full max-w-5xl flex justify-around gap-10 mb-12 p-4 items-center flex-col">
        <header className=" m-24 md:m-36 ">
          <h1 className=" text-5xl md:text-7xl font-extrabold tracking-tight text-center">
            How <span className="text-blue-600">to play</span>
          </h1>
        </header>
        <div className="relative w-full max-w-5xl flex justify-around gap-12 p-4 items-center flex-col">
          <div
            ref={lineRef}
            className="absolute flex-col justify-between w-2 top-0 hidden lg:flex  bg-custom-black dark:bg-custom-gray grow-timeline"
          />
          <div className=" w-full flex justify-between  ">
            <Image
              className="revealing-image border"
              src={gif1}
              height={800}
              width={400}
              alt={"pic"}
            />
            <div className="max-w-sm flex flex-col h-auto justify-center come-in">
              <h1 className="text-3xl">Play Random</h1>
              <h2 className=" font-bold">
                Choose your forte from a mix of Webtoons, Manga, Manhua and
                Manhwa and try to get the answer in 6 tries
              </h2>
            </div>
          </div>
          <div className="w-full flex justify-between  flex-row-reverse ">
            <Image
              className="revealing-image border"
              src={gif2}
              height={800}
              width={400}
              alt={"pic"}
            />
            <div className="max-w-sm flex flex-col h-auto justify-center come-in">
              <h1 className="text-3xl">Play Daily</h1>
              <h2 className="font-bold">
                Every day, a new comic (manhwa only) is featured for you to
                guess. Make sure to visit regularly to keep your streak!
              </h2>{" "}
            </div>
          </div>
          <div className="w-full flex justify-between  flex-row ">
            <Image
              className="revealing-image border border-black"
              src={gif3}
              height={800}
              width={400}
              alt={"pic"}
            />
            <div className="max-w-sm flex flex-col h-auto justify-center come-in">
              <h1 className="text-3xl">Play Challenge – Coming Soon!</h1>
              <h2 className="font-bold">
                Find out who has the better knowledge between you and your
                friends
              </h2>
            </div>
          </div>
        </div>
        <h1 className="text-2xl md:text-4xl text-center max-w-3xl mt-16 mb-4">
          Have ideas 💡, suggestions 🗳️, or comments 📝? Want to simply say
          share compliments? Feel free to reach out!
        </h1>
        <ul className="flex flex-row justify-evenly w-full mb-16">
          <a
            href="https://discordapp.com/users/619602146526232577"
            target="blank"
          >
            <svg
              className="h-6 w-6 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
            </svg>
          </a>
          <a href="https://twitter.com/AbdullahShehu1" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              href="https://twitter.com/AbdullahShehu1"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/_abdul_.s/" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>{" "}
          <a href="https://www.linkedin.com/in/abdullah-shehu/" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
          <a href="https://github.com/Abdul-Asa" target="blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </ul>
        <h1 className="text-2xl md:text-4xl text-center max-w-3xl m-8">
          Enjoy guessing various comics and don't forget to
          <Marker style="text-blue-600 hover:cursor-pointer" run={notify}>
            &nbsp; share &nbsp;
          </Marker>
          <CopyToClipboard
            text={fullURL}
            onCopy={() => {
              console.log({ copied: true, url: fullURL });
            }}
          >
            <span
              className={`inline-block md:hidden text-blue-600 hover:cursor-pointer`}
              onClick={notify}
            >
              &nbsp;share&nbsp;
            </span>
          </CopyToClipboard>
          with your friends.
        </h1>
        <pre
          className="asciiArt text-left mt-8"
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
                style={{ color: "transparent" }}
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
              data-tooltip-target="tooltip-top"
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
      <ToastContainer />
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


