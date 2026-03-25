import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1f3d',
          light: '#1a3a6e',
        },
        'custom-blue': {
          DEFAULT: '#1a56db',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        'custom-orange': {
          DEFAULT: '#f97316',
          light: '#fdba74',
          dark: '#ea580c',
        },
        'custom-green': {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        'custom-yellow': {
          DEFAULT: '#fbbf24',
          light: '#fcd34d',
          dark: '#d97706',
        },
        'custom-gray': {
          DEFAULT: '#64748b',
          light: '#94a3b8',
          dark: '#475569',
        },
        'custom-text': {
          DEFAULT: '#1e293b',
          light: '#374151',
          dark: '#111827',
        },
        'money': '#059669',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
