/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    screens: {
      'xs': {'max': '400px'},
      'sm': {'min': '400px', 'max': '767px'},
      'md': {'min': '768px', 'max': '1023px'},
      'lg': { 'min': '1024px', 'max': '1536px' },
      '2xl': {'min': '1536px'},
      '3xl': {'min': '2500px'},
    },
    colors: {
      "main": "#62b5e5",
      "white": "#fff",
      "gray": "#111835",
    },
  },
  plugins: [],
}

