export const media = {
  mobile: "@media (max-width: 831px)",
  desktop: "@media (min-width: 832px)",
  bigDesktop: "@media (min-width: 1024px)",
  bigMobile: "@media (max-width: 1023px)",
};

export const colors = {
  accent: "#0030ac",
  dim: "#808d98",
  pageBg: "#f8f8f8",
  darkBg: "#2c3c49",
  positive: "#00C170",
  negative: "#a31a25",
  primaryText: "#000000",
  grayBg: "#f1f5ff",
  secondary: "#808D98",
  white: "#ffffff",
  danger: "#FF6043",
  orange: "#FFAE4F",
  yellow: "#FFEB37",
  green: "#00a113",
  darkBlue: "#12358E",
  black: "#000000",
  cyan: "#E0E9FF",
  gray: "#838B9D",
  lightblue: "#2EB2FF",
  blackGray: "#24272E",
};

export const mixins = {
  card: {
    background: "#fff",
    borderRadius: 30,
    padding: 20,
    boxShadow: "3px 4px 33px 0px rgba(0, 39, 75, 0.06)",
    overflow: "hidden",
    display: "flex",
    gap: 16,
  },
};
