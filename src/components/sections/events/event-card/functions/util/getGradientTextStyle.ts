import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function getGradientTextStyle(opacity: number = 0.9) {
  return {
    fontFamily: poppins.style.fontFamily,
    background: `
      linear-gradient(0deg, rgba(240, 240, 240, ${opacity}), rgba(240, 240, 240, ${opacity})),
      linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)
    `,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
}
