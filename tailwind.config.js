/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '0',
      },
      colors: {
        // Coklat & Coklat Muda Palette (Elegan, Hangat, dan Seragam)
        terracotta: {
          50: '#FAF5EF',   // Coklat muda sangat lembut
          100: '#F5EBE1',  // Coklat muda hangat
          200: '#E8D5C4',  // Border coklat muda
          300: '#D4A373',  // Coklat keemasan lembut
          400: '#B88756',  // Coklat sedang lembut
          500: '#9C6638',  // Coklat hangat
          600: '#7F4E24',  // Coklat mantap
          700: '#643B17',  // Coklat utama (Signature Brown)
          800: '#4E2D0F',  // Coklat tua
          900: '#381F08',  // Coklat gelap
          950: '#241303',  // Coklat pekat
        },
        brown: {
          50: '#FAF5EF',
          100: '#F5EBE1',
          200: '#E8D5C4',
          300: '#D4A373',
          400: '#B88756',
          500: '#9C6638',
          600: '#7F4E24',
          700: '#643B17',
          800: '#4E2D0F',
          900: '#381F08',
          950: '#241303',
        },
        // Clean Luminous Paper & Ivory Canvas
        ivory: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#EFE8DD',
          300: '#DFD4C3',
          400: '#C7B9A5',
          500: '#A99A84',
          600: '#8A7B66',
          700: '#6C5E4C',
          800: '#4E4233',
          900: '#332A1F',
        },
        // Harmonized Warm Nusantara (Uniform Brown & Light Brown Accents)
        nusantara: {
          ochre: '#7F4E24',       // Coklat
          ochreLight: '#9C6638',
          forest: '#643B17',      // Coklat
          forestLight: '#7F4E24',
          indigo: '#643B17',      // Coklat
          indigoLight: '#7F4E24',
          purple: '#643B17',      // Coklat
          purpleLight: '#7F4E24',
          coral: '#9C6638',       // Coklat muda hangat
          charcoal: '#1C1917',    // Tinta Arang Modern
          charcoalSoft: '#292524',
          charcoalMuted: '#78716C',
          sand: '#FAF5EF',        // Coklat muda lembut
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        display: [
          'Newsreader',
          'Georgia',
          'Cambria',
          'serif',
        ],
        heritage: [
          'Cinzel',
          'Newsreader',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(33, 29, 27, 0.04), 0 1px 2px -1px rgba(33, 29, 27, 0.04)',
        'card': '0 4px 16px -2px rgba(33, 29, 27, 0.06), 0 1px 3px 0 rgba(33, 29, 27, 0.03)',
        'elevated': '0 10px 24px -4px rgba(33, 29, 27, 0.08), 0 2px 6px -1px rgba(33, 29, 27, 0.04)',
        'terracotta': '0 8px 24px -4px rgba(164, 78, 56, 0.25)',
        'prestigious': '0 20px 40px -15px rgba(33, 29, 27, 0.12), 0 0 0 1px rgba(164, 78, 56, 0.08)',
      },
      animation: {
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'shimmer-spin': 'shimmerSpin var(--duration, 2.4s) linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        shimmerSpin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
    },
  },
  plugins: [],
}
