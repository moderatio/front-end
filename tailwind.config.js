/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require("tailwindcss-font-inter"),
    // ... other plugins
  ],

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#F5F5F3",
      creamy: "#e7e8ea",
      ebony: "#09081B",
      mulberry: "#F25C7D",
      java: "#05D6CA",
      "sky-blue": "#DDF4FF",
      "fun-blue": "#02214B",
      "dark-blue": "#021541",
      "weird-orange": "#F56558",
      "dark-pink": "#9D406E",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
