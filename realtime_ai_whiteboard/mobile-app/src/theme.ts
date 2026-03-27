// Figma design tokens – Whiteboard Mobile
export const colors = {
  primary: "#2563EB",
  primaryDark: "#004AC6",
  primaryLight: "rgba(172, 191, 255, 0.2)",
  primarySoft: "rgba(0, 74, 198, 0.05)",

  heading: "#191C1E",
  body: "#434655",
  muted: "#737686",
  placeholder: "rgba(67, 70, 85, 0.6)",
  secondaryText: "#626267",
  chevron: "#C1C6D7",

  bg: "#F8F9FB",
  cardBg: "#FFFFFF",
  inputBg: "#F3F4F6",
  settingsBg: "#F3F4F6",
  footerBg: "#1E293B",

  danger: "#BC000A",
  dangerButton: "#EF4444",
  success: "#16A34A",
  successBg: "#F0FDF4",
  successBadge: "#DCFCE7",
  successText: "#15803D",

  border: "rgba(113, 119, 134, 0.2)",
  divider: "#EDEEF0",
  tabInactive: "#94A3B8",
  tabActiveText: "#1D4ED8",
  tabActiveBg: "#EFF6FF",

  white: "#FFFFFF",
  black: "#000000",
  shadow: "rgba(0, 0, 0, 0.1)",
} as const;

export const fonts = {
  regular: "Inter" as const,
  // Sizes from Figma
  h1: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
    letterSpacing: -0.48,
  },
  h2: { fontSize: 18, fontWeight: "700" as const, lineHeight: 27 },
  h3: { fontSize: 14, fontWeight: "600" as const, lineHeight: 20 },
  body: { fontSize: 16, fontWeight: "400" as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: "400" as const, lineHeight: 21 },
  caption: { fontSize: 12, fontWeight: "400" as const, lineHeight: 16 },
  label: {
    fontSize: 11,
    fontWeight: "700" as const,
    lineHeight: 16,
    letterSpacing: 1.1,
    textTransform: "uppercase" as const,
  },
  button: { fontSize: 16, fontWeight: "700" as const, lineHeight: 24 },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500" as const,
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
  },
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  elevated: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  fab: {
    shadowColor: "#004AC6",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
} as const;
