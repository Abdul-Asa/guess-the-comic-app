"use client";
import { useTheme } from "next-themes";
export const ColorSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={`w-fit  right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
