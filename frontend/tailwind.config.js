/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	content: [],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#f2f7f8',
					200: '#D8EAFF',
					300: '#7ab6eb',
					400: '#64aae8',
					500: '#4e9ee4',
					600: '#3792e1',
					700: '#308ee0',
					800: '#2186de',
					900: '#1e78c8',
				},
			},
		},
	},
	plugins: [],
};
