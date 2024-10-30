import type { Config } from "tailwindcss";

export default (<Config>{
  content: ["./src/**/*.{html,svelte,ts}"],

  experimental: {
    optimizeUniversalDefaults: true,
  },
});
