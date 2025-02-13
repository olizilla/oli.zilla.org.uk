import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				serif: [
					'Charter', 
					'Bitstream Charter', 
					'Sitka Text', 
					'Cambria', 
					'ui-serif', 
					'serif', 
					'Apple Color Emoji', 
					'Segoe UI Emoji', 
					'Segoe UI Symbol', 
					'Noto Color Emoji'
				],
				mono: [
					'courier_prime_sans',
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'Consolas',
					'"Liberation Mono"',
					'"Courier New"',
					'monospace',
					'Apple Color Emoji', 
					'Segoe UI Emoji', 
					'Segoe UI Symbol', 
					'Noto Color Emoji'
				],
			},
		},
	},
	plugins: [
		typography
	],
}
