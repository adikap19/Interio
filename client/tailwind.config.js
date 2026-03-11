/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50:  '#faf8f5',
          100: '#f5f0e8',
          200: '#ede4d3',
          300: '#e0d0b8',
          400: '#d0b99a',
          500: '#bfa07e',
          600: '#a88460',
          700: '#8c6a48',
          800: '#6e5038',
          900: '#4e382a',
        },
        brown: {
          50:  '#f7f3ef',
          100: '#ede4d9',
          200: '#d9c8b0',
          300: '#c4a882',
          400: '#b08856',
          500: '#9a6e3a',
          600: '#7d582e',
          700: '#634524',
          800: '#4a331c',
          900: '#312215',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Lato"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
