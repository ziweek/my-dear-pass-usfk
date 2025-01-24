import type { Config } from "tailwindcss";

// Next ui import
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Next ui source directory
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          background: "#3B3B3B",
          foreground: "#E0E0E0",
          primary: "#BB86FC",
          secondary: "#03DAC6",
          error: "#CF6679",
        },
      },
      boxShadow: {
        inner: "inset 0 0 0 2px #ef4444",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#3B3B3B",
            foreground: "#E0E0E0",
            primary: {
              foreground: "#ffffff",
              DEFAULT: "#BB86FC",
            },
            secondary: {
              foreground: "#000000",
              DEFAULT: "#03DAC6",
            },
          },
        },
      },
    }),
  ],
};
export default config;
