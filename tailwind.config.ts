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
        'mElement': '0.5rem', // espacio entre text elementos dentro de un contenedor
        'mGenderTop': '4.5rem', // Margen personalizado
        
      },
      padding: {
       'p8': '0.5rem', //Aquí padding del top menu
       'pHeader': '0.5rem', //Aquí padding del top menu
       'pImgGrid': '0rem', //Aquí padding del top menu
      },
      gap: {
        'g8': '0.5rem', // Aquí margin de los productos y inicio grid
      },
      height: {
        'h1': '32rem', //title size
        'h2': '32rem', //sin uso
      },
      
      fontSize: {
        'fs0': '0.7rem', // Tamaño de fuente personalizado
        'fs1': '0.75rem', // Tamaño de fuente personalizado
        'fs2': '0.875rem',   // Tamaño de precio
        'fsLogo': '1.75rem',   //logo font Size
        'fsHeader': '1.37rem', //Encabezados texto
      },
      fontWeight: {
        //Valores permitidos ['100','300', '400', '500', '700', '900']

        fw1: '100', // 
        fw3: '300', //sin uso
        fw4: '400', //Numeros
        fw5: '500', // 
        fw7: '700', //Nombre de los gender del topmenu, nombre de los producto y emcabezados
        fw9: '900', // Weight logo y numero de carrito
      },
      colors: {
        //Colores --- blaco=FFFDF6 verde=384C2E verdeClaro= naranja=BC6C25 naranjaClaro=DDA15E
        colorPrimary: '#384C2E', //506E42HunterGreen Color de la marca
        colorSecondary: '#FFFDF6', //Crema Color de la marca
        color3: '#DDA15E',
        color4: '#506E42',
        coloMix: '#FFFDF6', //Crema Color de la marca
        colorHover: '#DDA15E', //text-gray-400 HOVER
      },
      borderColor: {
        //Color de los borde personalizado aquí
        'customBC': '#384C2E', //Color de los border de todo
        'customBCImg': '#384C2E', //Color dBotton de img ProductosGrid
      },
      borderWidth: {
        //Grosor de los borde personalizado aquí
        'customBW': '0.1rem', // Linea de todo
        'customBwImg': '0.1rem', //Linea Botton de img ProductosGrid
      },
      borderRadius: {
        //Ezquinas Redondeadas de los borde personalizado aquí
        'brAll': '1rem', //border radius de todo
        'brImg': '0rem', //Border radius de img ProductosGrid
      },
      boxShadow: {
        //Sombras para los componentes personalizado aquí
        'customBS': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
        'custom-1': '5px 5px 9px rgb(120, 120, 120, 0.40), -5px -5px 10px rgba(240, 240, 240, 0.40)',
        'custom-2': '5px 5px 20px rgb(120, 120, 120, 0.50), -2px -2px 5px rgba(240, 240, 240, 0.50)',
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
