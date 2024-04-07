import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionOpacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      duration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionDelay: ['hover, focus']
    },
  },
  plugins: [],
} satisfies Config;
