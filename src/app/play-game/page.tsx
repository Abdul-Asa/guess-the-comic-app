"use client";
import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Image, { ImageLoaderProps } from "next/image";
import { fetchData } from "@/utils/fetchApi";
import picture from "../../../public/download.png";

import { Key, Suspense, useEffect, useState } from "react";
import { DataItem, RawItem, getRandomElement } from "@/utils/type";
import InputDropdown from "@/components/InputDropdown";

export default function Play() {
  const [list, setlist] = useState<DataItem[]>([]);
  const [answer, setanswer] = useState<DataItem>();
  const [openModal, setopenModal] = useState(true);
  const [blur, setblur] = useState<boolean>(true);
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
              imgSrc: item.md_covers[0].b2key,
              alt_titles: item.md_titles.map(
                (titleObj: { title: any }) => titleObj.title
              ),
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
  useEffect(() => {
    if (list.length > 0) {
      const theOne = getRandomElement(list);
      console.log(theOne);
      setanswer(theOne);
    }
  }, [list]);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {openModal && (
        <Modal>
          <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Welcome
          </h1>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
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
            <a href="/">
              <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Back
              </button>
            </a>
          </div>
        </Modal>
      )}
      {answer && (
        <section className="flex flex-col items-center">
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
              style={blur ? { filter: "blur(10px)" } : {}}
            />{" "}
          </div>
          <h1 className=" m-4">Guess {7 - lives >= 7 ? 6 : 7 - lives} of 6</h1>
          <InputDropdown
            options={list}
            callback={() => {
              console.log("works");
              return true;
            }}
          />
        </section>
      )}
    </main>
  );
}
