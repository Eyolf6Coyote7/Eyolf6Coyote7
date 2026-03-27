import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - accept anything
    navigate("/assets");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #2a2d3a",
    background: "#1a1d27",
    color: "#e1e4e8",
    fontSize: 14,
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f1117",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: 360, background: "#161822", padding: 32, borderRadius: 16, border: "1px solid #2a2d3a" }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#6c63ff", marginBottom: 8 }}>{t("login.title")}</h1>
        <p style={{ color: "#8b8fa3", fontSize: 14, marginBottom: 24 }}>{t("login.subtitle")}</p>

        <label style={{ display: "block", marginBottom: 16 }}>
          <span style={{ display: "block", fontSize: 13, color: "#8b8fa3", marginBottom: 6 }}>{t("login.email")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder={t("login.emailPlaceholder")}
          />
        </label>

        <label style={{ display: "block", marginBottom: 24 }}>
          <span style={{ display: "block", fontSize: 13, color: "#8b8fa3", marginBottom: 6 }}>
            {t("login.password")}
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="********"
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 8,
            border: "none",
            background: "#6c63ff",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("login.signIn")}
        </button>
      </form>
    </div>
  );
}
