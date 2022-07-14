/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#a8f780',

          secondary: '#a4f24b',

          accent: '#2eba8d',

          neutral: '#181C2A',

          'base-100': '#37355F',

          info: '#4699DD',

          success: '#79E7D1',

          warning: '#CF6E07',

          error: '#E95D5D',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
