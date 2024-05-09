/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-purple": "#081A51",
				"light-white": "rgba(255, 255, 255,0.18)",
				"main-background": "#242424",
				"post-background": "#2c2d39",
			},
		},
	},
	plugins: [daisyui],
};
