"use client";
import Modal from "@/components/Modal";
import Image, { ImageLoaderProps } from "next/image";
import { fetchData } from "@/utils/fetchApi";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { DataItem, RawItem, getDate } from "@/utils/type";
import InputDropdown from "@/components/InputDropdown";
import AnimatedDiv from "@/components/AnimatedDiv";
import Link from "next/link";
import { ColorSwitcher } from "@/components/ColorSwitch";
import Spinner from "@/components/Spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getKeyItem, setKeyItem } from "@/utils/action";
import logo from "../../../public/download.png";

// Function to get daily comics
const getDaily = async () => {
  let supabase = createClientComponentClient();
  let { data } = await supabase.from("Daily").select("day,comic");
  return data;
};

export default function Play() {
  // State variables
  const [dimensions, setDimensions] = useState({ height: 200, width: 200 });
  const [list, setlist] = useState<DataItem[]>([]);
  const [answer, setanswer] = useState<DataItem>();
  const [guesses, setGuesses] = useState<DataItem[]>([]);
  const [blur, setblur] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setIsloading] = useState(true);
  const [lives, setLives] = useState<number>(6);
  const [playerInfo, setplayerInfo] = useState({
    today: false,
    played: 0,
    wins: 0,
    streak: 0,
    lastTime: getDate(),
  });

  // Function to load the page
  const loadPage = () => {
    setIsloading(true);
    fetchData({ countries: { kr: true }, trending: "Trending" }).then(
      (results) => {
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const transformedData: DataItem = result.value.map(
              (item: RawItem) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                year: item.year,
                status: item.status,
                demographic: item.demographic,
                genres: item.genres,
                last_chapter: item.last_chapter,
                imgSrc: item.md_covers[0]?.b2key,
                alt_titles: item.md_titles.map(
                  (titleObj: { title: any }) => titleObj.title
                ),
                country: item.country, // Access the 'country' key here
              })
            );
            setlist((prev) => [...prev, transformedData].flat());
          } else {
            console.error(
              `Error fetching from API endpoint ${index}:`,
              result.reason
            );
          }
        });
      }
    );
  };
  // Image loader function
  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };

  // Function to handle option selection
  const handleOptionSelected = (option: DataItem): boolean => {
    console.log(option);
    setGuesses((prev) => [...prev, option]);
    if (option.title == answer?.title) {
      setblur(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setIsVisible(true);
      if (!playerInfo.today) {
        setplayerInfo((prev) => {
          setKeyItem("daily", {
            ...prev,
            today: true,
            played: prev.played + 1,
            wins: prev.wins + 1,
            streak: prev.streak + 1,
          });

          return {
            ...prev,
            today: true,
            played: prev.played + 1,
            wins: prev.wins + 1,
            streak: prev.streak + 1,
          };
        });
      }
      console.log("Game ends...you win 🎉");
    } else {
      setLives(lives - 1);
      if (lives == 1) {
        setblur(false);
        console.log("Game ends...you lose");
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setIsVisible(true);
        if (!playerInfo.today) {
          setplayerInfo((prev) => {
            setKeyItem("daily", {
              ...prev,
              today: true,
              played: prev.played + 1,
              streak: 0,
            });

            return {
              ...prev,
              today: true,
              played: prev.played + 1,
              streak: 0,
            };
          });
        }
      }
    }
    return option.title == answer?.title;
  };

  // useEffect hooks
  //Update the list after API fetch
  useEffect(() => {
    if (list.length > 0) {
      getDaily().then((res) => {
        const today = new Date().toISOString().split("T")[0];

        const todayComicTitle = res!
          .filter((item) => item.day === today)
          .map((item: { comic: any }) => item.comic)[0];

        const comicObject = list.find(
          (comic) => comic.title === todayComicTitle
        );
        setanswer(comicObject);
        setIsloading(false);
      });
    }
  }, [list]);

  //Load the page on mount
  useEffect(() => {
    loadPage();
  }, []);

  //Get user history from local storage
  useEffect(() => {
    const test = JSON.parse(getKeyItem("daily"));
    if (test) {
      if (test.lastTime != getDate()) {
        setplayerInfo({ ...test, today: false });
      } else {
        setplayerInfo(test);
      }
    }

    if (JSON.parse(getKeyItem("daily")) == null) {
      setplayerInfo({
        today: false,
        played: 0,
        wins: 0,
        streak: 0,
        lastTime: getDate(),
      });
    }
  }, []);

  //set dimensions of confetti on mount
  useEffect(() => {
    setDimensions({
      height: document.body.scrollHeight,
      width: document.body.scrollWidth,
    });
  }, []);

  // Main return statement
  return (
    <main className="flex min-h-screen flex-col items-center px-6 md:px-24">
      {/* Navigation bar */}
      <nav id="navbar" className=" w-full flex justify-center sticky  ">
        <div className=" come-in w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
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
        </div>
      </nav>

      {/* Loading state */}
      {loading && (
        <div className="mt-10 flex flex-col items-center">
          <h1>{getDate()}</h1>
          <Spinner />
          <Link
            href="/"
            as={"/"}
            className="group mt-4 transition duration-300"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
          </Link>
        </div>
      )}
      {/* Main game section */}
      {!loading && answer && (
        <section className="flex flex-col items-center w-full">
          <div
            className="p-3 rounded-lg bg-gray-200 text-black shadow-lg "
            style={{ width: 275, height: 388 }}
          >
            <Image
              width={275}
              height={388}
              className="w-full h-auto rounded-lg"
              src={answer?.imgSrc}
              loader={imageLoader}
              alt={"Guess the manhwa"}
              style={
                blur
                  ? { filter: "blur(10px)", objectFit: "cover" }
                  : { objectFit: "cover" }
              }
            />{" "}
          </div>
          <h1 className=" m-4">Guess {7 - lives >= 7 ? 6 : 7 - lives} of 6</h1>
          <InputDropdown options={list} callback={handleOptionSelected} />
          <AnimatedDiv guessList={guesses} answer={answer} />
          <Link
            href="/"
            as={"/"}
            className="group mt-4 transition duration-300"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white"></span>
          </Link>
          {isVisible && lives != 0 && (
            <Confetti height={dimensions.height} width={dimensions.width} />
          )}
          {isVisible && lives != 0 && (
            <Modal>
              <h1 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                {playerInfo?.today
                  ? "You've attempted today's challenge already"
                  : " Nice! 😎"}
              </h1>
              <ol className="text-white">
                <li>Played: {playerInfo?.played}</li>
                <li>Wins: {playerInfo?.wins}</li>
                <li>Current streak: {playerInfo?.streak}</li>
              </ol>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                The answer is {answer?.title}. Come back tommorow for more
              </h3>
              <Link href="/" as={"/"}>
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Back
                </button>
              </Link>
            </Modal>
          )}{" "}
          {isVisible && lives == 0 && (
            <Modal>
              <h1 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                {playerInfo?.today
                  ? "You've attempted today's challenge already"
                  : "You lose!🗿"}
              </h1>
              <ol className=".text-white">
                <li>Played: {playerInfo?.played}</li>
                <li>Wins: {playerInfo?.wins}</li>
                <li>Current streak: {playerInfo?.streak}</li>
              </ol>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                The answer is {answer?.title}. Come back tommorow for more
              </h3>
              <Link href="/" as={"/"}>
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Back
                </button>
              </Link>
            </Modal>
          )}
        </section>
      )}
    </main>
  );
}

// ------- Refactoring Suggestions -------
// 1. The code inside the loadPage function can be refactored into a separate API call function.
// 2. The player's game logic and state management could be moved into a custom hook or separate module to keep the component clean.
// 3. The rendering logic for different game states (loading, win, lose) could be broken down into smaller components.
// 4. Consider using TypeScript interfaces or types for defining the shape of the state and props.
// 5. The getDate function could be moved to a utility file if it's used in other parts of the application.

