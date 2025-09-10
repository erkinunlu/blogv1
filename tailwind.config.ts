import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: {
					blue: "#2563eb",
					orange: "#f97316",
					gray: "#6b7280",
					light: "#f5f7fb",
					dark: "#0b1220",
				},
			},
		},
	},
	plugins: [],
};
export default config;
