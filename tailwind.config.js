// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        text_borders: "#B32C90",
        suggestion_color: "#fdf6fa",
        prompt_bg: "#F0F4F8",
        suggestion_border: "#E0E0E0",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // This enables animations
  ],
};
