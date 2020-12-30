const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    // './src/**/*.jsx',
    './components/**/*.jsx',
    './pages/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      outline: {
        'solid-black': '1px solid black',
        'solid-gray': '1px solid gray',
        'solid-red': '1.5px solid red'
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(0.8)' },
          '80%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        zoom: 'zoom .5s ease-in'
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      width: {
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
        '30r': '30rem',
        '35r': '35rem',
        '40r': '40rem',
        '45r': '45rem',
        '50r': '50rem',
      },
      top: {
        '80%': '80%'
      },
      height: {
        '30%': '30%',
        '70%': '70%',
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '82': '26rem',
        '30r': '30rem',
        '35r': '35rem',
        '40r': '40rem',
        '45r': '45rem',
        '50r': '50rem',
       },
       colors: {
        primary: colors.red[500],
        secondary: colors.gray[50]
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: "3rem"
        },
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      boxShadow: ['active'],
      margin: ['active'],
      transform: ['active'],
      scale: ['active']
    },
  },
  plugins: [],
}
