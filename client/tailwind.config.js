/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // React files
    "./public/index.html"          // HTML template
  ],
  theme: {
    extend: {}, // Customize theme here (colors, fonts, etc.)
  },
  plugins: [],
};
