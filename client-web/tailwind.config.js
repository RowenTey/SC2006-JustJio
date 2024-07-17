/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"justjio-primary": "#E9D7FD",
				"justjio-secondary": "#4E1164",
			},
		},
		screens: {
			xs: "435px",
			sm: "640px",
		},
	},
	plugins: [],
};
