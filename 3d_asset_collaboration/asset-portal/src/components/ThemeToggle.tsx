import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-secondary, #64748B)",
        padding: 0,
      }}
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M9 1V3M9 15V17M1 9H3M15 9H17M3.3 3.3L4.7 4.7M13.3 13.3L14.7 14.7M14.7 3.3L13.3 4.7M4.7 13.3L3.3 14.7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M15.5 10.5A7 7 0 1 1 7.5 2.5 5 5 0 0 0 15.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
