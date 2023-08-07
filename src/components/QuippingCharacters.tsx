import { useState, useEffect } from "react";
import Image from "next/image";
import meme1 from "../../public/meme2.gif";
import meme2 from "../../public/meme.gif";

export const NanaQuipping = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const quips = [
    "Did you know that honey never spoils? Just like my love for my friends, it lasts forever! 🍯",
    "I tried cooking for the first time today. Let's just say the fire department and I are now on a first-name basis! 🔥",
    "A group of flamingos is called a 'flamboyance.' I think I've found my spirit animal! 💃",
    "I tried to catch some fog today, but I mist! Get it? Mist? I crack myself up! 🌫️",
    "Wombat poop is cube-shaped! Nature sure has a weird sense of humor, doesn't it? 💩",
    "Did you know that the human brain uses the same amount of power as a 10-watt light bulb?  So keep yours shining bright by studying hard! 💡",
    "A group of owls is called a 'parliament.' Just like us quintuplets, they must have a lot to discuss! 🦉",
    "I heard that a snail can sleep for three years. I wish I could do that, especially during exam season! 🐌",
    "A single strand of spaghetti is called a 'spaghetto.' It's funny how something so simple can have such a fancy name, isn't it? 🍝",
    `Check out my little brother's YT channel: "https://www.youtube.com/@Silvacer`,
  ];

  useEffect(() => {
    const changeQuip = () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };
    changeQuip();
  }, []);
  const handleClick = () => {
    setIsVisible(true);
    setDisabled(true);
    setQuipIndex((prevIndex) => (prevIndex + 1) % quips.length);
    setTimeout(() => {
      setIsVisible(false);
      setDisabled(false);
    }, 5000);
  };
  return (
    <button
      className="relative flex items-center"
      onClick={handleClick}
      disabled={disabled}
    >
      <Image className="gif" src={meme2} height={50} width={50} alt={"pic"} />
      <div className={`speech-box ${isVisible ? "" : "fade-out"}`}>
        <div className="speech-bubble absolute left-[60px] top-[-10px] bg-white text-black p-2 rounded-md shadow-md">
          <p>{quips[quipIndex]}</p>
        </div>
      </div>
    </button>
  );
};

export const KomiQuipping = () => {
  const [quipIndex, setQuipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const quips = ["💃🏼", "❤️", "🤭", "🗿", "😒", "👉🏼🚪"];

  const handleClick = () => {
    setIsVisible(true);
    setQuipIndex((prevIndex) => (prevIndex + 1) % quips.length);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
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
