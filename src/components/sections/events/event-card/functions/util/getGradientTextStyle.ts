export default function getGradientTextStyle(opacity?: number) {
  return {
    background: `linear-gradient(0deg, rgba(240, 240, 240, ${opacity}), rgba(240, 240, 240, ${opacity})),
linear-gradient(265.86deg, #FFFFFF 29.57%, rgba(236, 236, 236, 0.23) 114.98%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent", // Fallback for browsers that don't support backgroundClip
  };
}
