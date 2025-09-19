/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"./apps/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				'accordion-down': {
					'0%': { height: '0' },
					'100%': { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					'0%': { height: 'var(--radix-accordion-content-height)' },
					'100%': { height: '0' },
				},
			},
      animation: {
        'slide-down': 'slide-down 0.3s ease',
        'slide-up': 'slide-up 0.3s ease',
      },
		},
	},
	plugins: [],
};
