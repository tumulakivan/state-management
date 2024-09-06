/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'offwhite' : '#e3e3e3',
        'offblack' : '#1f1f1f',
        'footer' : '#b8b8b8',
        'lightpurple' : '#c369ff',
        'darkpurple' : '#7905e6',
        'babyblue' : '#6195c9',
      },
      boxShadow: {
        'custom-top-bar' : '3px 7px 10px rgba(0, 0, 0, 0.35)',
        'custom-top-bar-dark' : '3px 7px 10px rgba(0, 0, 0, 0.6)',
      },
      height: {
        'footer-height' : '24rem',
      },
      fontFamily: {
        'comfortaa' : ['Comfortaa', 'sans-serif'],
      },
    },
  },
  plugins: [],
}