/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Ensure dark mode is set to 'class'
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkBg: '#2d3748', // Custom dark background color
        darkText: '#fabc57', // Custom dark text color
        darkHover: '#ffd76a', // Custom dark hover color
        lightBg: '#ffffff', // Custom light background color
        lightText: '#007BFF', // Custom light text color
        lightHover: '#6aaaff', // Custom light hover color
      },
    },
  },
  plugins: [],
};
