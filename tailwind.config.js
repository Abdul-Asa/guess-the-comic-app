/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["sofia-pro", "sans-serif"],
      },
      backgroundColor: {
        "custom-gray": "#EBEBEB",
        "custom-black": "#0d0d0d",
      },
    },
  },
};
