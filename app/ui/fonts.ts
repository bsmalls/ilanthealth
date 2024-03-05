import { Montserrat } from "next/font/google";
import { Bitter } from "next/font/google";

export const montserrat = Montserrat({ subsets: ["latin"] });
export const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});