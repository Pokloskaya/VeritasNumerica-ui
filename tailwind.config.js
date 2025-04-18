/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'fade': 'var(--fade)',
        'fade-1': 'var(--fade-1)',
        'fade-6': 'var(--fade-6)',
        'success': 'var(--success)',
        'success-shadow': 'var(--success-shadow)',
        'success-shadow-darker': 'var(--success-shadow-darker)',
        'error': 'var(--error)',
        'error-shadow': 'var(--error-shadow)',
        'error-shadow-darker': 'var(--error-shadow-darker)',
        'alert': 'var(--alert)',
        'alert-shadow': 'var(--alert-shadow)',
        'alert-shadow-darker': 'var(--alert-shadow-darker)'
      }
    },
  },
  plugins: [
    require('tailwindcss-patterns')
  ],
}
