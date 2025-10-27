// hero.ts
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: "#E63944", // Indigo-600
          foreground: "#FFFFFF",
        },
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "#E63944", // Indigo-500 (light version for dark theme)
          foreground: "#FFFFFF",
        },
      },
    },
  },
});
