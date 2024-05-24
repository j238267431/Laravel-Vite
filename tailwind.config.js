/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors:{
        // my_color: '#4dcb7a',
      },
      // hover:{

      // }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

