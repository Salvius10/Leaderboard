import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ganit: {
          dark:   "#1a00d9",
          mid:    "#5e9eff",
          light:  "#dbeaff",
          orange: "#fe6e06",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(26,0,217,0.06), 0 1px 2px -1px rgba(26,0,217,0.06)",
        "card-hover": "0 4px 16px 0 rgba(26,0,217,0.12), 0 2px 6px -2px rgba(26,0,217,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
