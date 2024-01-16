/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

