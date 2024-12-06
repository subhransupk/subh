import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-cyan-400',
    'text-pink-400',
    'text-purple-400',
    'text-yellow-400',
    'bg-cyan-500/20',
    'bg-pink-500/20',
    'bg-purple-500/20',
    'bg-yellow-500/20',
    'border-cyan-500/30',
    'border-pink-500/30',
    'border-purple-500/30',
    'border-yellow-500/30'
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 51, 102, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
