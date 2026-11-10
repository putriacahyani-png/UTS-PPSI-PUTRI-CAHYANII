/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F5BEA',
          hover: '#1E44C9',
          pressed: '#1836A3',
          tint: '#EAF0FF',
          tint2: '#DCE6FF',
        },
        secondary: {
          DEFAULT: '#0D9488',
          text: '#0F766E',
          tint: '#E6F7F6',
        },
        ai: {
          violet: '#7C3AED',
          text: '#5B21B6',
          tint: '#F3EEFF',
          border: '#DDD0FF',
        },
        success: {
          DEFAULT: '#059669',
          text: '#047857',
          tint: '#E7F8F0',
        },
        warning: {
          DEFAULT: '#D97706',
          text: '#B45309',
          tint: '#FFF4DF',
        },
        danger: {
          DEFAULT: '#E11D48',
          text: '#BE123C',
          tint: '#FFE9ED',
        },
        slatebg: '#F6F8FC',
        surface: '#FFFFFF',
        surfaceSec: '#F1F4FA',
        surfaceTer: '#E7ECF5',
        lineBorder: '#E2E8F0',
        textMain: '#0F172A',
        textSec: '#475569',
        textMuted: '#94A3B8',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        hairline: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        card: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        glow: '0 12px 30px -4px rgba(47, 91, 234, 0.15)',
      },
    },
  },
  plugins: [],
};

