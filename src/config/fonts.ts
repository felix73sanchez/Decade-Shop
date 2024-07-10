import {Montserrat_Alternates, Exo_2, Roboto} from "next/font/google";
import { Size } from '../interfaces/product.interface';

export const logoFont = Exo_2({ subsets: ["latin"], style: ["italic"], weight: ['100','300', '400', '500', '700', '900'], });

export const allFont = Roboto({ subsets: ["latin"], weight: ['100','300', '400', '500', '700', '900'], });