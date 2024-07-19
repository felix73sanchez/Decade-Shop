import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'XR': '414px',
        // => @media (min-width: 414px XR) { ... }
  
        '12Pro': '390px',
        // => @media (min-width: 390px) { ... }
  
        '14Pro': '430px',
        // => @media (min-width: 430px) { ... }
      },
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
        'fs2': '0.875rem',  // Tamaño de precio
        'fsLogo': '1.75rem',  //logo font Size
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
        'customBC': '#506E42', //Color de los border de todo
        'customBCImg': '#506E42', //Color dBotton de img ProductosGrid
      },
      borderWidth: {
        //Grosor de los borde personalizado aquí
        'customBW': '0.1rem', // Linea de todo
        'customBwImg': '0.115rem', //Linea Botton de img ProductosGrid
      },
      borderRadius: {
        //Ezquinas Redondeadas de los borde personalizado aquí
        'brAll': '1rem', //border radius de todo
        'brImg': '2rem', //Border radius de img ProductosGrid
      },
      boxShadow: {
        //Sombras para los componentes personalizado aquí
        'customBS': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);',
        'custom-1': '5px 5px 9px rgb(110, 120, 155, 0.10)',
        'custom-2': '2px 2px 5px rgb(80, 110, 66, 0.25), -2px -2px 5px rgba(80, 110, 66, 0.25)',
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
        levitate: 'levitate 3s ease-in-out infinite', // Ajusta la duración y el tiempo según tus necesidades
      },
      levitate: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' }, // Ajusta el valor según tus necesidades
      },
      transitionDuration: {
        '2000': '2000ms',
      }

    },
  },
  plugins: [],
};
export default config;
