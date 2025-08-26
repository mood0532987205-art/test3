module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
        //todo:: inject it via the plugin or easier way
        'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme   : {
        container : {
            center : true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                'Inter',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Roboto',
                'sans-serif',
            ],
            primary: "var(--font-main)",
            display: ["var(--font-main)", "Inter", "sans-serif"],
        },
        extend    : {
            transitionTimingFunction: {
              'elastic': 'cubic-bezier(0.55, 0, 0.1, 1)',
              'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
              '2000': '2000ms',
              '3000': '3000ms',
            },
            gridTemplateColumns: {
                'auto-fill'  : 'repeat(auto-fill, 290px)',
                'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
                'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
            },
            colors: {
                // Orange-Blue Theme Colors
                'dark': '#1D1F1F',
                'darker': '#0E0F0F',
                'danger': '#AE0A0A',
                
                // Primary Colors - Orange Theme
                'primary': {
                    50: '#fff7f4',
                    100: '#ffe8e0',
                    200: '#ffd1c0',
                    300: '#ffb399',
                    400: '#ff8a5c',
                    500: '#ff6b35',
                    600: '#e55a2b',
                    700: '#cc4a22',
                    800: '#b33a1a',
                    900: '#992a12',
                    DEFAULT: '#ff6b35', // Orange primary
                },
                
                // Secondary Colors - Blue Theme
                'secondary': {
                    50: '#f0f8ff',
                    100: '#e0f0ff',
                    200: '#c1e0ff',
                    300: '#a3d0ff',
                    400: '#85c0ff',
                    500: '#0066cc',
                    600: '#0052a3',
                    700: '#003d7a',
                    800: '#002952',
                    900: '#001529',
                },
                
                // Accent Colors - Golden Yellow
                'accent': {
                    50: '#fffef0',
                    100: '#fffde0',
                    200: '#fffbc0',
                    300: '#fff9a0',
                    400: '#fff780',
                    500: '#ffd700',
                    600: '#ffb300',
                    700: '#ff9900',
                    800: '#ff8000',
                    900: '#ff6600',
                },
                
                'success': {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                'warning': {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                'glass': {
                    white: 'rgba(255, 255, 255, 0.1)',
                    black: 'rgba(0, 0, 0, 0.1)',
                }
            },
            spacing: {
              '3.75': '15px',
              '7.5' : '30px',
              '18': '4.5rem',
              '22': '5.5rem',
              '58'  : '232px',
              '62'  : '248px',
              '100' : '28rem',
              '116' : '464px',
              '132' : '528px',
              '200' : '800px',
            },
            borderRadius: {
                'large': '22px',
                'big'  : '40px',
                'tiny' : '3px',
                '4xl': '2rem',
                DEFAULT: '.75rem',
            },
            fontSize: {
                'icon-lg'   : '33px',
                'xxs'       : '10px',
                'xxxs'      : '8px',
                'title-size': '42px',
                '22px'      : '22px',
                '7xl': '5rem',
                '8xl': '6rem',
                '9xl': '8rem',
            },
            lineHeight: {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
                '18': '4.5rem',
                '20': '5rem',
                'extra-loose': '2.5',
            },
            boxShadow: {
                'default' : '5px 10px 30px #2B2D340D;',
                'top'     : '0px 0px 10px #0000001A;',
                'md'      : '5px 10px 99px #2B2D340D',
                'dropdown': '0 4px 8px rgba(161, 121, 121, 0.07)',
                'light'   : '0px 4px 15px rgba(1, 1, 1, 0.06)',
                'huge'    : '0px 3px 6px #00000029',
                'progress': '0 5px 15px rgba(92, 213, 196, 0.4)',
                'mobile': 'rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 18px, rgb(0 0 0 / 9%) -15px 10px 7px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -20px 10px 20px, rgb(0 0 0 / 9%) -25px 20px 20px',
                // Modern shadow utilities
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'elegant': '0 10px 40px rgba(0, 0, 0, 0.1)',
                'crisp': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                'depth': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
            },
            width: {
                '18': '4.5rem',
                '22': '5.5rem',
                '74': '18.5rem',
                '76': '19rem',
                '78': '19.5rem',
            },
            height: {
                'banner'        : '200px',
                'lg-banner'     : '428px',
                'full-banner'   : '600px',
                '500'           : '500px',
                '460'           : '460px',
                'screen-1/2': '50vh',
                'screen-2/3': '66.666667vh',
                'screen-3/4': '75vh',
            },
            minWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '8xl': '88rem',
                '9xl': '96rem',
            },
            zIndex: {
                '1': '1',
                '2': '2',
                '-1': '-1',
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            screens: {
                'xxs': {'min': '380px', 'max': '479px'},
                'xs': '480px',
                '3xl': '1920px',
            },
            backgroundOpacity: {
                '05': '0.05',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            backdropBlur: {
                'xs': '2px',
            },
            keyframes: {
                slideUpFromBottom: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0%)', opacity: '1' },
                },
                slideDownFromBottom: {
                    '0%': { transform: 'translateY(0%)', opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInScale: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateY(0)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
            },
            animation: {
                slideUpFromBottom: 'slideUpFromBottom .6s linear',
                slideDownFromBottom: 'slideDownFromBottom .6s linear',
                fadeInUp: 'fadeInUp 0.6s ease-out',
                fadeInScale: 'fadeInScale 0.6s ease-out',
                shimmer: 'shimmer 1.5s ease-in-out infinite',
                bounce: 'bounce 1s infinite',
                wiggle: 'wiggle 1s ease-in-out infinite',
                'gradient-x': 'gradient-x 15s ease infinite',
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    corePlugins: {
      outline: false,
    },
    plugins: [
      require('@salla.sa/twilight-tailwind-theme'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
}
