/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbe6',
          100: '#fff1b8',
          200: '#ffe58f',
          300: '#ffd666',
          400: '#ffc069',
          500: '#F5A623', // Primary Warm Amber
          600: '#FFB800', // Vivid Glow
          700: '#d48806',
          800: '#b7791f',
          900: '#8c5811',
          950: '#4c2f02',
        },
        crimson: {
          50: '#fffbe6',
          100: '#fff1b8',
          200: '#ffe58f',
          300: '#ffd666',
          400: '#ffc069',
          500: '#F5A623', // Mapped to Primary Amber
          600: '#FFB800', // Mapped to Vivid Amber
          700: '#d48806',
          800: '#b7791f',
          900: '#8c5811',
          950: '#4c2f02',
        },
        dark: {
          base: '#050505',
          surface: '#09090b',
          card: '#121218',
          cardHover: '#181824',
          muted: '#27273a',
          subtle: '#1f1f2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'crimson-radial': 'radial-gradient(circle at center, rgba(245, 166, 35, 0.22) 0%, transparent 70%)',
        'crimson-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 184, 0, 0.28) 0%, transparent 60%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(9, 9, 11, 0.8) 0%, rgba(5, 5, 5, 0.95) 100%)',
        'smoke-texture': "url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=2000')",
      },
      boxShadow: {
        'crimson-glow': '0 0 25px -5px rgba(245, 166, 35, 0.45)',
        'crimson-sm': '0 0 12px -2px rgba(255, 184, 0, 0.35)',
        'dark-elevation': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      borderWidth: {
        '1': '1px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
