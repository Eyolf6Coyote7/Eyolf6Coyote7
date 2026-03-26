import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/assets", label: "Assets" },
  { to: "/upload", label: "Upload" },
  { to: "/iot-dashboard", label: "IoT Dashboard" },
];

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#161822",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderRight: "1px solid #2a2d3a",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#6c63ff", marginBottom: 24 }}>Asset Portal</h1>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: "block",
              padding: "10px 14px",
              borderRadius: 8,
              color: isActive ? "#fff" : "#8b8fa3",
              background: isActive ? "#6c63ff22" : "transparent",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            height: 56,
            background: "#161822",
            borderBottom: "1px solid #2a2d3a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <span style={{ fontSize: 14, color: "#8b8fa3" }}>3D Asset Collaboration Platform</span>
          <NavLink to="/login" style={{ color: "#6c63ff", textDecoration: "none", fontSize: 14 }}>
            Login
          </NavLink>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 24, overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
