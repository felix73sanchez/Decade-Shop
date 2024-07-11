import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      margin: {
        'mBody': '0.5rem', // Margen del cuerpo
        'm8': '0.5rem', // Margen personalizado
        'm0': '0rem', // Margen personalizado
        'mGenderTop': '4.5rem', // Margen personalizado
        
      },
      padding: {
       'p8': '0.5rem', //Aquí padding del top menu
      },
      gap: {
        'g8': '0.5rem', // Aquí margin de los productos
      },
      height: {
        'h1': '32rem', //title size
        'h2': '30rem', //sin uso
      },
      
      fontSize: {
        'fs0': '0.5rem', // Tamaño de fuente personalizado
        'fs1': '0.75rem', // Tamaño de fuente personalizado
        'fs2': '0.875rem',   // Tamaño de precio
        'fsLogo': '1.37rem',   //logo font Size
      },
      fontWeight: {
        //Valores permitidos ['100','300', '400', '500', '700', '900']

        fw1: '100', // 
        fw3: '300', //sin uso
        fw4: '400', //Numeros
        fw5: '500', // 
        fw7: '700', //Nombre de los gender del topmenu y nombre de los productos
        fw9: '900', // Weight logo
      },
      colors: {
        //Colores personalizar aquí
        colorPrimary: '#506E42', //HunterGreen Color de la marca
        colorSecondary: '#FFFDF6', //Crema Color de la marca
        colorHover: 'rgb(156 163 175)', //text-gray-400 HOVER
      },
      borderColor: {
        //Color de los borde personalizado aquí
        'customBC': '#506E42', //Color de los border de todo
      },
      borderWidth: {
        //Grosor de los borde personalizado aquí
        'customBW': '0.09rem', // Linea de todo
      },
      borderRadius: {
        //Ezquinas Redondeadas de los borde personalizado aquí
        'brAll': '0.875rem', //border radius de todo
      },
      boxShadow: {
        //Sombras para los componentes personalizado aquí
        'customBS': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
      },
      //Bar Moving 
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },

    },
  },
  plugins: [],
};
export default config;
