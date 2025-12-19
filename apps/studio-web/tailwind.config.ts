import type { Config } from "tailwindcss";

import rootConfig from "../../tailwind.config";

const config: Config = {
  ...(rootConfig as Config),
  content: ["./app/**/*.{ts,tsx,js,jsx,mdx}", "../../packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}"],
};

export default config;
