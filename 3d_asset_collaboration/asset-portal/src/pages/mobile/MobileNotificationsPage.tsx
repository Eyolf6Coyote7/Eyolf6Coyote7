const notifications = [
  {
    type: "asset",
    title: "Jake Liu uploaded Air Max 2026 \u2014 Hero Shot v4",
    time: "2 mins ago",
    unread: true,
    borderColor: "rgba(70,72,212,0.2)",
    iconBg: "rgba(70,72,212,0.1)",
    iconColor: "#4648D4",
  },
  {
    type: "critical",
    title: "Motor C temperature exceeded threshold",
    detail: "95.2 C \u00b7 Factory Floor",
    time: "15 mins ago",
    unread: true,
    badge: "CRITICAL",
    badgeBg: "#FFDAD6",
    badgeColor: "#BA1A1A",
    borderColor: "rgba(186,26,26,0.2)",
    iconBg: "#FFDAD6",
    iconColor: "#BA1A1A",
  },
  {
    type: "warning",
    title: "Conveyor belt vibration elevated",
    detail: "4.2g \u00b7 Factory Floor",
    time: "45 mins ago",
    unread: true,
    borderColor: "rgba(144,73,0,0.2)",
    iconBg: "#FFDCC5",
    iconColor: "#904900",
  },
  {
    type: "share",
    title: "Sarah Park shared Packaging Concept with you",
    detail: '"Packaging Concept v1"',
    time: "3 hours ago",
    unread: false,
    iconBg: "#E1E3E4",
    iconColor: "#464554",
  },
  {
    type: "resolved",
    title: "Motor C temperature returned to normal",
    detail: "42 C \u00b7 Factory Floor",
    time: "1 hour ago",
    unread: false,
    iconBg: "#E1E0FF",
    iconColor: "#575992",
  },
  {
    type: "system",
    title: "System: Bulk assets uploaded successfully",
    time: "1 hour ago",
    unread: false,
    iconBg: "#E1E3E4",
    iconColor: "#464554",
  },
];

export default function MobileNotificationsPage() {
  return (
    <div
      style={{
        width: 390,
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "#F8F9FA",
        margin: "0 auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 32px 8px" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#191C1D" }}>9:41</span>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 24px 19px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700, color: "#191C1D", letterSpacing: -0.425 }}>Notifications</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#4F46E5", cursor: "pointer" }}>Clear All</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", background: "#FFF" }}>
        {["All", "Assets", "IoT Alerts"].map((t, i) => (
          <div
            key={t}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "0 0 8px",
              borderBottom: i === 0 ? "2px solid #4648D4" : "none",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? "#4648D4" : "#464554" }}>
              {t}
            </span>
          </div>
        ))}
      </div>

      {/* List */}
      <div style={{ padding: "16px 12px 128px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Today */}
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase" as const,
              color: "#767586",
            }}
          >
            TODAY
          </span>
        </div>

        {notifications.slice(0, 3).map((n, i) => (
          <div
            key={i}
            style={{
              background: "#FFF",
              borderLeft: `3px solid ${n.borderColor}`,
              boxShadow: n.unread ? "0px 1px 2px rgba(0,0,0,0.05)" : "none",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: n.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill={n.iconColor}>
                <circle cx="6.5" cy="6.5" r="5" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#191C1D", lineHeight: "23px", marginBottom: 4 }}>
                {n.title}
              </div>
              {n.detail && <div style={{ fontSize: 13, color: "#464554", marginBottom: 4 }}>{n.detail}</div>}
              <div style={{ fontSize: 12, color: "#464554" }}>{n.time}</div>
            </div>
            {n.unread && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#4648D4",
                }}
              />
            )}
            {n.badge && (
              <div style={{ position: "absolute", top: 16, right: 32, display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    background: n.badgeBg,
                    borderRadius: 4,
                    padding: "2px 6px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: n.badgeColor,
                  }}
                >
                  {n.badge}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Yesterday */}
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase" as const,
              color: "#767586",
            }}
          >
            YESTERDAY
          </span>
        </div>

        {notifications.slice(3).map((n, i) => (
          <div
            key={i}
            style={{
              background: n.unread ? "#FFF" : "rgba(243,244,245,0.5)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              opacity: n.unread ? 1 : 0.8,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                background: n.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill={n.iconColor}>
                <circle cx="6.5" cy="6.5" r="5" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#191C1D", lineHeight: "21px", marginBottom: 4 }}>
                {n.title}
              </div>
              {n.detail && <div style={{ fontSize: 13, color: "#464554", marginBottom: 4 }}>{n.detail}</div>}
              <div style={{ fontSize: 12, color: "#464554" }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
