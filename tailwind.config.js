/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B63F6',
          hover: '#0951cb',
          light: '#EBF3FE',
          dark: '#083da1',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
          light: '#ECFEFF',
        },
        navy: {
          950: '#070E22',
          900: '#0B1736', // Dark Navy
          800: '#102A56', // Deep Cyber Blue
          700: '#1E3A8A',
          600: '#334155',
          500: '#64748B',
        },
        cyber: {
          bg: '#F4F8FC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          cyan: '#22D3EE',
          purple: '#7C3AED',
          green: '#22C55E',
          amber: '#F59E0B',
          red: '#EF4444',
        },
        medical: {
          bg: '#F4F8FC',
          card: '#FFFFFF',
          cardBorder: '#E2E8F0',
          accent: '#0B63F6',
          cyan: '#06B6D4',
          teal: '#0D9488',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(11, 23, 54, 0.04), 0 1px 2px -1px rgba(11, 23, 54, 0.04)',
        'card-hover': '0 8px 24px -4px rgba(11, 23, 54, 0.08), 0 2px 6px -2px rgba(11, 23, 54, 0.04)',
        'glass': '0 4px 20px 0 rgba(11, 23, 54, 0.05)',
        'cyber': '0 0 0 1px rgba(11, 99, 246, 0.15), 0 4px 20px -2px rgba(11, 99, 246, 0.1)',
        'soft': '0 2px 10px 0 rgba(11, 23, 54, 0.03)',
      }
    },
  },
  plugins: [],
}
