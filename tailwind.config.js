/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        surface: '#141414',
        'surface-elevated': '#1c1c1c',
        'surface-border': '#262626',
        primary: {
          DEFAULT: '#FFD43B', // warm kin-paku yellow
          hover: '#f5c623',
          muted: 'rgba(255, 212, 59, 0.15)',
        },
        danger: {
          DEFAULT: '#E53935', // crimson red
          hover: '#d32f2f',
          muted: 'rgba(229, 57, 53, 0.15)',
        },
        safe: {
          DEFAULT: '#10B981', // emerald green for verified safe states
          hover: '#059669',
          muted: 'rgba(16, 185, 129, 0.15)',
        },
        ink: {
          offwhite: '#F5F1E8',
          muted: '#A59E92',
          faint: '#4E4940',
        },
        accent: {
          orange: '#D9822B', // muted earth orange
          dark: '#111111',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'ink-spread': 'inkSpread 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'radar': 'radar 3s linear infinite',
        'coin-spin': 'coinSpin 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
      keyframes: {
        inkSpread: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        coinSpin: {
          '0%': { transform: 'rotateY(0deg) scale(0.7)' },
          '50%': { transform: 'rotateY(1080deg) scale(1.3)' },
          '100%': { transform: 'rotateY(1800deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
