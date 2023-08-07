"use client";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Image, { ImageLoaderProps } from "next/image";
import { fetchData } from "@/utils/fetchApi";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { DataItem, RawItem, getRandomElement } from "@/utils/type";
import InputDropdown from "@/components/InputDropdown";
import AnimatedDiv from "@/components/AnimatedDiv";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useIsPresent, motion } from "framer-motion";
import { ColorSwitcher } from "@/components/ColorSwitch";
import Spinner from "@/components/Spinner";

export default function Play() {
  const router = useRouter();

  const [list, setlist] = useState<DataItem[]>([]);
  const [answer, setanswer] = useState<DataItem>();
  const [guesses, setGuesses] = useState<DataItem[]>([]);
  const [openModal, setopenModal] = useState(true);
  const [blur, setblur] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setIsloading] = useState(true);
  const [lives, setLives] = useState<number>(6);
  const [radio, setRadio] = useState<string>("Trending");
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    kr: true,
  });
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.value]: event.target.checked,
    });
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.target.value);
  };
  const loadPage = () => {
    setopenModal(false);
    setIsloading(true);
    fetchData({ countries: checkboxes, trending: radio }).then((results) => {
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
    });
  };
  const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return `https://meo.comick.pictures/${src}?w=${width}&q=${quality || 100}`;
  };
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
      }
    }
    return option.title == answer?.title;
  };
  const restartGame = () => {
    router.refresh();
    setlist([]);
    setGuesses([]);
    setLives(6);
    setblur(true);
    setIsVisible(false);
    setopenModal(true);
  };

  useEffect(() => {
    if (list.length > 0) {
      const theOne = getRandomElement(list);
      console.log(theOne);
      setanswer(theOne);
      setIsloading(false);
    }
  }, [list]);

  return (
    <main className="flex min-h-screen flex-col items-center px-6 md:px-24">
      <nav id="navbar" className=" w-full flex justify-center sticky  ">
        <div className=" come-in w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <h2 className="">Logo</h2>
          <ColorSwitcher />
        </div>
      </nav>
      {loading && (
        <div className="mt-10 flex items-center">
          <Spinner />
        </div>
      )}
      {openModal && (
        <Modal>
          <h1 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
            Welcome
          </h1>
          <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
            Choose your settings
          </h3>
          <Form
            checkboxes={checkboxes}
            radio={radio}
            handleCheckboxChange={handleCheckboxChange}
            handleRadioChange={handleRadioChange}
          />
          <div className="flex gap-4">
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={loadPage}
            >
              Let's Play🎉
            </button>
            <Link href="/" as={"/"}>
              <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
              </button>
            </Link>
          </div>
        </Modal>
      )}
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
          {isVisible && lives != 0 && <Confetti />}
          {isVisible && lives != 0 && (
            <Modal>
              <h1 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                You win 🎉
              </h1>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                The answer was <b>{answer?.title}</b>
              </h3>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={restartGame}
                >
                  Play again
                </button>
                <a href="/">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go Home
                  </button>
                </a>
              </div>
            </Modal>
          )}
          {isVisible && lives == 0 && (
            <Modal>
              <h1 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                You lose 😞
              </h1>
              <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
                The answer was <b>{answer.title}</b>
              </h3>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={restartGame}
                >
                  Try again
                </button>
                <a href="/">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go Home
                  </button>
                </a>
              </div>
            </Modal>
          )}
        </section>
      )}
    </main>
  );
}
