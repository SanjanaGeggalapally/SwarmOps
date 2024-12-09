/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      customBlack: '#051923',
      navbarBg: '#EBEBEB',
      delftBlue: '#223759',
      plat:'#f2f0ef',
    },
    boxShadow: {
      'all-sides': '0 4px 20px rgba(0, 0, 0, 0.25)', // Custom shadow for all sides
    }
},
  },
  plugins: [],
}

