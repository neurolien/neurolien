/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "main": "#62b5e5",
        "white": "#fff",
        "gray": "#111835",
      },
      screens: {
        'xs': {'max': '400px'},
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-mode="dark"]'],
}

