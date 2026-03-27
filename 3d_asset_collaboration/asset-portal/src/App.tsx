import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItemDefs = [
  { to: "/assets", labelKey: "nav.assets", icon: "grid" },
  { to: "/upload", labelKey: "nav.upload", icon: "upload" },
  { to: "/iot-dashboard", labelKey: "nav.iotDashboard", icon: "activity" },
  { to: "/compare", labelKey: "nav.compare", icon: "columns" },
  { to: "/settings", labelKey: "nav.settings", icon: "settings" },
  { to: "/account", labelKey: "nav.account", icon: "user" },
];

const icons: Record<string, React.ReactNode> = {
  grid: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  ),
  upload: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 14V3M10 3L6 7M10 3L14 7" />
      <path d="M3 13V15C3 16.1 3.9 17 5 17H15C16.1 17 17 16.1 17 15V13" />
    </svg>
  ),
  activity: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="2,12 6,4 10,14 14,8 18,12" />
    </svg>
  ),
  columns: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="7" height="16" rx="1" />
      <rect x="11" y="2" width="7" height="16" rx="1" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 1V4M10 16V19M1 10H4M16 10H19M3.5 3.5L5.5 5.5M14.5 14.5L16.5 16.5M16.5 3.5L14.5 5.5M5.5 14.5L3.5 16.5" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="7" r="4" />
      <path d="M2 19C2 14.6 5.6 11 10 11C14.4 11 18 14.6 18 19" />
    </svg>
  ),
};

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const isUnity = location.pathname.startsWith("/unity");
  const navItems = navItemDefs.map((d) => ({ ...d, label: t(d.labelKey) }));

  if (isUnity) {
    return <Outlet />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F9F9FF" }}>
      {/* Header */}
      <header
        style={{
          height: 56,
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="3" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#141B2B",
              letterSpacing: -0.45,
            }}
          >
            {t("app.title")}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            padding: "8px 16px",
            width: 400,
            maxWidth: "40vw",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#94A3B8" strokeWidth="1.8">
            <circle cx="8" cy="8" r="5.5" />
            <path d="M12.5 12.5L16 16" />
          </svg>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#94A3B8", flex: 1 }}>
            {t("app.searchPlaceholder")}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#94A3B8",
              background: "#F1F5F9",
              borderRadius: 4,
              padding: "2px 6px",
              border: "1px solid #E2E8F0",
            }}
          >
            &#8984;K
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: "#E1E0FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#4648D4">
                <circle cx="7" cy="7" r="6" stroke="#4648D4" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#141B2B" }}>
              Nike
            </span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#64748B" strokeWidth="1.5" />
            </svg>
          </div>
          <div style={{ color: "#64748B", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#64748B" strokeWidth="1.8">
              <path d="M10 2C7.2 2 5 4.2 5 7V11L3 14H17L15 11V7C15 4.2 12.8 2 10 2Z" />
              <path d="M8 16C8 17.1 8.9 18 10 18C11.1 18 12 17.1 12 16" />
            </svg>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              background: "#4648D4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>MW</span>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 240,
            background: "#F8FAFC",
            borderRight: "1px solid #F1F5F9",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  color: isActive ? "#4F46E5" : "#64748B",
                  background: isActive ? "#EEF2FF" : "transparent",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s",
                })}
              >
                <span style={{ display: "flex" }}>{icons[item.icon]}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              background: "#F1F3FF",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "#E1E8FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#4648D4" }}>
                MW
              </span>
            </div>
            <div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#141B2B" }}>
                Maya W.
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#464554" }}>
                {t("app.brandAdmin")}
              </div>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, overflow: "auto", background: "#F9F9FF" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
