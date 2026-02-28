/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#0A0A0A',
                ivory: '#F5F0E8',
                gold: '#C9A84C',
                rose: '#D4A5A5',
                offwhite: '#EDEDED'
            },
            fontFamily: {
                serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
                sans: ['Inter', 'DM Sans', 'sans-serif'],
                accent: ['Cinzel', 'serif']
            }
        },
    },
    plugins: [],
}
