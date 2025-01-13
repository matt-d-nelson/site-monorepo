/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{html,js,ts}', './libs/**/*.{html,js,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '4/1': '4 / 1',
        '16/9': '16 / 9',
      },
      borderColor: {
        DEFAULT: '--text',
      },
    },
  },
  plugins: [],
}
