/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-roboto)",
        heading: "var(--font-roboto)",
      },
      colors: {
        "cyan-5": "#22B8CF",
        "cyan-7": "#1098ad",
        "gray-5": "#adb5bd",
        "gray-2": "#E9ECEF",
        "gray-4": "#CED4DA",
        "gray-7": "#495057",
        "gray-9": "#212529",
        "gray-8": "#343A40",
        "gray-10": "#353B41",
        "dark-gray": "#2B3136",
        "dark-gray-1": "#575E64",
      },
    },
  },
  plugins: [],
};
