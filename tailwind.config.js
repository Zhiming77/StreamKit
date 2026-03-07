/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // TODO (Step 3): Add your custom color palette here
      // Pick a dark theme palette that feels like YOU.
      // Example structure:
      // colors: {
      //   sk: {
      //     bg: "#0a0e17",
      //     surface: "#111827",
      //     accent: "#22d3ee",
      //     ...
      //   }
      // }
    },
  },
  plugins: [],
};
