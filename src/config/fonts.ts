import { Inter, Montserrat_Alternates, Exo_2, Roboto} from "next/font/google";
import { Size } from '../interfaces/product.interface';


export const inter = Inter({ subsets: ["latin"] });
//export const titleFont = Montserrat_Alternates({ subsets: ["latin"], weight: ['500', '700'], });

export const logoFont = Exo_2({ subsets: ["latin"], style: ["italic"], weight: ['900'], });

export const titleFont = Roboto({ subsets: ["latin"], weight: ['500', '700'], });

