/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        'color-primary': 'var(--green-600)',
        'color-secondary': 'var(--neutral-800)',
        'color-tertiary': 'var(--neutral-100)',

        'color-extra-primary': 'var(--green-900)',
        'color-extra-secondary': 'var(--green-100)',
        'color-extra-tertiary': 'var(--orange-600)',

        'color-background-primary': 'var(--neutral-100)',
        'color-background-secondary': 'var(--green-50)',
        
        'color-text-primary': 'var(--neutral-800)',
        'color-text-secondary': 'var(--neutral-600)',
        'color-text-tertiary': 'var(--neutral-500)',

        'color-extra-text-primary': 'var(--neutral-700)',

        'color-button-primary': 'var(--neutral-700)',
        'color-button-secondary': 'var(--neutral-200)',
        'color-button-tertiary': 'var(--yellow-500)',

        'color-border-primary': 'var(--neutral-300)',
        'color-border-secondary': 'var(--neutral-200)',

        'color-object-primary': 'var(--red-500)',
        'color-object-secondary': 'var(--teal-600)',
        'color-object-tertirary': 'var(--amber-400)',

        'color-hover-primary': 'rgba(0, 0, 0, 0.04)'
      },
    },
  },
  plugins: [],
};
