/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        surface: "rgba(255, 255, 255, 0.9)",
        surfaceLight: "#ffffff",
        glassBorder: "rgba(226, 232, 240, 0.8)",
        primary: {
          DEFAULT: "#4f46e5",
          hover: "#4338ca",
          light: "#eef2ff",
          border: "#c7d2fe",
          glow: "rgba(79, 70, 229, 0.25)"
        },
        accent: {
          cyan: "#0284c7",
          emerald: "#059669",
          amber: "#d97706",
          rose: "#e11d48",
          purple: "#7c3aed"
        }
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        thick: '24px'
      },
      boxShadow: {
        'glass': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'glass-glow': '0 0 20px rgba(79, 70, 229, 0.15)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.1)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatRev 10s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
