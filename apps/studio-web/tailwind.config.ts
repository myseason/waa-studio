import type { Config } from "tailwindcss";

import rootConfig from "../../tailwind.config";

export default {
  ...rootConfig,
  content: ["./app/**/*.{ts,tsx,js,jsx,mdx}", "../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}"],
} satisfies Config;
