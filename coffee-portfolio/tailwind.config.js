/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50:  '#FDF8F3',
          100: '#F5E6D3',
          200: '#E8C99A',
          300: '#D4A96A',
          400: '#B8813A',
          500: '#6F4E37',
          600: '#5A3D2B',
          700: '#432C1E',
          800: '#2E1F16',
          900: '#1A0F0A',
        },
        gold: {
          300: '#F0D060',
          400: '#E8C240',
          500: '#D4AF37',
          600: '#B8920A',
          700: '#9A7A00',
        },
        cream: '#F5E6D3',
        dark: {
          100: '#2A2A2A',
          200: '#1F1F1F',
          300: '#1A1A1A',
          400: '#141414',
          500: '#0F0F0F',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        poppins:  ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'gold-glow':    '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)',
        'coffee-glow':  '0 0 30px rgba(111,78,55,0.5), 0 0 60px rgba(111,78,55,0.2)',
        'cream-glow':   '0 0 20px rgba(245,230,211,0.3)',
        'card-hover':   '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.2)',
        'glass':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'coffee-gradient': 'linear-gradient(135deg, #2E1F16 0%, #0F0F0F 50%, #1A1A1A 100%)',
        'gold-gradient':   'linear-gradient(135deg, #D4AF37 0%, #F0D060 50%, #B8920A 100%)',
        'hero-gradient':   'radial-gradient(ellipse at center, #2E1F16 0%, #1A1A1A 40%, #0F0F0F 100%)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'steam':      'steam 3s ease-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'bean-drift': 'beanDrift 15s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'fade-up':    'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        steam: {
          '0%':   { opacity: '0.8', transform: 'translateY(0) scaleX(1)' },
          '100%': { opacity: '0',   transform: 'translateY(-60px) scaleX(1.5)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(212,175,55,0.7), 0 0 100px rgba(212,175,55,0.3)' },
        },
        beanDrift: {
          '0%':   { transform: 'translateY(0) rotate(0deg)' },
          '33%':  { transform: 'translateY(-40px) rotate(120deg)' },
          '66%':  { transform: 'translateY(20px) rotate(240deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
