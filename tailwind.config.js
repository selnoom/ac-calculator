/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      spacing: {
        '0.25': '0.0625rem', // Adds a 'p-0.25' class with 1px padding
      }
    },
  },
  plugins: [],
}

