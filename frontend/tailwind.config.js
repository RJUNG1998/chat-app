/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "light-beige": "#fff0db",
      "baby-pink": "#ffdbe9",
    },
    fontFamily: {
      SuperVibes: ["super-vibes"],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
