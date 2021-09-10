module.exports = {
  mode:'jit',
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        header:['Source Code Pro'],
        body:['Poppins']
      },
      colors:{
        logoGradient: 'linear-gradient(315deg, #0cbaba 0%, #380036 74%)',
        resultGradient: 'linear-gradient(315deg, #b3cdd1 75%, #9fa4c4 74%)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
