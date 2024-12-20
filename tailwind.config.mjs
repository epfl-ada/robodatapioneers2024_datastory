/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				red2: {
					100: "#e50000", // Bright red
					200: "#91060d", // Dark red
					300: "#e0878a", // Additional red
				},
				green2: {
					100: "#165B33", // Dark green
					200: "#187F42", // Light green
					300: "#558a6a", // Additional green
					400: "#97bd88", // Additional green
				},
				yellow2: {
					100: "#f8b229", // Yellow
					200: "#e8e791", // Additional yellow
				},
			},
			fontFamily: {
				sans: ["var(--font-geist-sans)"],
				mono: ["var(--font-geist-mono)"],
				monoton: ["var(--font-monoton)"],
			},
		},
	},
	plugins: [],
};
