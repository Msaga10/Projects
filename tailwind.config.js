/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {



      fontFamily: {
        roboto: ['roboto', 'sans-serif'],
        'open-sans': ['open-sans','sans-serif'],
        lato: ['lato','sans-serif'],
        montserrat:['montserrat','sans-serif'],
        poppins:['poppins','sans-serif'],
        anton:['anton','sans-serif'],
        Sevillana:['Sevillana','sans-serif']
      },
      colors: {
       'primary-blue':'#0056D2',
       
       'light-blue':'#1789fc',
      
      //  'dark-blue':'#04067b',
       'dark-blue':'#050797',

      }


      
    },
  },
  plugins: [],
}

