/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
        fontFamily: {
            sans: ["SFPro", 'sans-serif'],
            bold: "SFProBold",
            light: "SFProLight",
            black: "SFProBlack",
            newyork: "NewYork",
            newyorkbold: "NewYorkBold"
        }
    },
  },
  plugins: [],
}

