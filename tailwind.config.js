/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  mode: 'jit',
  theme: {
    extend: {
      animation: {
        fade: 'fadeIn 0.4s ease-in',
      },
      keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }
      
    },
  },
  plugins: [require('daisyui')],

  // daisyUI config (optional)
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ff7768',
          secondary: '#0a53ad',
          accent: '#ef846b',
          neutral: '#32283E',
          'base-100': '#30385A',
          info: '#9CDAF7',
          success: '#0891b2',
          warning: '#0d9488',
          error: '#f43f5e',
        },
      },
      'light',
      'dark',
      'garden',
      'pastel',
      'dracula',
    ],
    darkTheme: 'mytheme',
    lightTheme: 'garden',
  },
}
