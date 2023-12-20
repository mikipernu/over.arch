/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'chat-blue': '#0019FF',
        'chat-green': '#1FB186',
        'chat-red': '#FF2E00'
      },
    },
    // fontFamily: {
    //   sans: ['Inter', 'sans-serif']
    // }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
