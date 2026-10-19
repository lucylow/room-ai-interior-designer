export const mobileDesign = {
  color: {
    ink: "#24231F",
    muted: "#77736B",
    paper: "#F5F2EB",
    card: "#FFFEFA",
    line: "#E5E0D7",
    clay: "#A85F45",
    clayDark: "#824733",
    sage: "#687363",
    sand: "#D9C5A6",
    cream: "#EEE6D8",
    white: "#FFFFFF",
    night: "#292925",
  },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 },
  radius: { sm: 12, md: 16, lg: 22, xl: 28, pill: 999 },
  touchTarget: 48,
} as const;

export type MobileDesignToken = typeof mobileDesign;
