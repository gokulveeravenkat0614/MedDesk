/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1677FF',
          hover: '#0958d9',
          light: '#E6F4FF',
          dark: '#003eb3',
        },
        secondary: {
          DEFAULT: '#38BDF8',
          hover: '#0284C7',
          light: '#F0F9FF',
        },
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
          600: '#475569',
        },
        medical: {
          bg: '#F4F7FC',
          card: 'rgba(255, 255, 255, 0.78)',
          cardBorder: 'rgba(255, 255, 255, 0.9)',
          accent: '#1677FF',
          cyan: '#06B6D4',
          teal: '#0D9488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '28px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(22, 119, 255, 0.12)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}
