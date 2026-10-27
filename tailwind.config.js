/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#0d8a55',
          800: '#0a6c43',
          900: '#064e3b',
          dark: '#0f172a',
          navy: '#0b1d28',
          footer: '#081c22',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'mockup': '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
        'float': '0 12px 35px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -3px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
