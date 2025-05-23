/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        cal: ['"Cal Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
