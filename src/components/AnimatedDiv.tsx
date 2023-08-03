import React, { useEffect, useState, ReactNode } from "react";
import { genreCodes } from "@/utils/genre-codes";
import { DataItem } from "@/utils/type";

interface AnimatedBoxProps {
  guessList: DataItem[];

  answer: DataItem;
}

const Circle = ({
  bg,
  delay,
  children,
}: {
  bg: string;
  delay: number;
  children: ReactNode;
}) => {
  const [active, setActive] = useState(false);

  const bgClasses: { [color: string]: string } = {
    red: "bg-red-100",
    green: "bg-green-100",
    // Add more as needed
  };

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`border ${
        bgClasses[bg]
      } border-gray-500 p-3 rounded-lg min-w-max w-full content-center text-center ${
        active ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 flex items-center justify-center `}
    >
      {children}
    </div>
  );
};
interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded m-0.5">
      {text}
    </span>
  );
};

const AnimatedDivs: React.FC<AnimatedBoxProps> = ({ guessList, answer }) => {
  function getNamesById(array: any[], ids: string | any[]) {
    // Filter the array to only include items with ids in the provided id array
    const filtered = array.filter((item) => ids.includes(item.id));

    // Map the filtered array to an array of names
    const names = filtered.map((item) => item.name);

    return names;
  }
  return (
    <div className="flex flex-col-reverse w-full ">
      {guessList?.map((guess, ind) => (
        <div
          className="w-full sm:min-w-max flex flex-col items-center p-8 border "
          key={ind}
        >
          <h1>
            <b>{guess.title}</b>
          </h1>
          <div className="w-full h-fit-content flex flex-col lg:flex-row justify-around items-center gap-4 p-2">
            <div>
              <p className=" text-center">Demographic</p>
              <Circle
                delay={350}
                bg={
                  guess.country == answer.country &&
                  guess.demographic == answer.demographic
                    ? "green"
                    : "red"
                }
              >
                {guess.demographic === 1 && "Shounen"}
                {guess.demographic === 2 && "Shouju"}
                {guess.demographic === 3 && "Seinen"}
                {guess.demographic === 4 && "Josei"}
                {guess.demographic === null && ""}
                {guess.country === "kr" && " Manwha"}
                {guess.country === "jp" && " Manga"}
                {guess.country === "gb" && " Webtoon"}
                {guess.country === "cn" && " Manhua"}
              </Circle>
            </div>
            <div>
              <p className="text-center">Comic status</p>
              <Circle
                delay={700}
                bg={guess.status == answer.status ? "green" : "red"}
              >
                {guess.status === 1 && "Ongoing"}
                {guess.status === 2 && "Completed"}
                {guess.status === 3 && "Cancelled"}
                {guess.status === 4 && "Hiatus"}
              </Circle>
            </div>
            <div>
              <p className="text-center">Year released </p>

              <Circle
                delay={1050}
                bg={guess.year == answer.year ? "green" : "red"}
              >
                {guess.year > answer.year
                  ? guess.year + " ⬇️"
                  : guess.year < answer.year
                  ? guess.year + " ⬆️"
                  : guess.year + " "}
              </Circle>
            </div>
            <div>
              <p className=" text-center">No. of chapters</p>

              <Circle
                delay={1400}
                bg={guess.last_chapter == answer.last_chapter ? "green" : "red"}
              >
                {guess.last_chapter > answer.last_chapter
                  ? guess.last_chapter + " ⬇️"
                  : guess.last_chapter < answer.last_chapter
                  ? guess.last_chapter + " ⬆️"
                  : guess.last_chapter + " "}
              </Circle>
            </div>
            <div>
              <p className=" text-center">Similar Genres</p>

              <Circle delay={1750} bg="none">
                <div className="flex max-w-xs md:max-w-sm flex-wrap-reverse ">
                  {" "}
                  {getNamesById(
                    genreCodes,
                    answer.genres.filter((value: any) =>
                      guess.genres.includes(value)
                    )
                  ).map((badge: string, id: number) => (
                    <Badge key={id} text={badge} />
                  ))}
                </div>
              </Circle>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedDivs;
