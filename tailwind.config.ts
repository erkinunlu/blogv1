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
					blue: "#2563eb", // canlı mavi
					orange: "#f97316", // canlı turuncu
					pink: "#ec4899",
					violet: "#7c3aed",
					teal: "#14b8a6",
					light: "#f3f6ff",
					dark: "#0a0f1f",
				},
			},
		},
	},
	plugins: [],
};
export default config;
