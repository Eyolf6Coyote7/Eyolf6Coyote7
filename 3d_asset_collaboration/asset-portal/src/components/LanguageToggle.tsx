import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === "en" ? "zh-TW" : "en";
    void i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <button
      onClick={toggle}
      title="Switch language"
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
      <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10H18" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="10" cy="10" rx="4" ry="8.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
