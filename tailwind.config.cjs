/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                default: '#121213',
                correct: '#538d4e',
                misplaced: '#b59f3b',
                wrong: '#3a3a3c',
            },
        },
    },
    plugins: [],
}
