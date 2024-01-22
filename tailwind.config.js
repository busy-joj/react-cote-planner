/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        empty: { full: "#F0F0EF", line: "#E6E6E6" },
        good: {
          1: { full: "#D0E7D2", line: "#B9D8BC" },
          2: { full: "#B0D9B1", line: "#8AB989" },
          3: { full: "#79AC78", line: "#5F975E" },
          4: { full: "#416241", line: "#235F23" },
        },
        bad: {
          1: { full: "#F4DFBA", line: "#E3CBA0" },
          2: { full: "#EEC373", line: "#DFAA46" },
          3: { full: "#CA965C", line: "#B27A3C" },
          4: { full: "#876445", line: "#75563B" },
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  plugins: [],
  darkMode: "class",
};
