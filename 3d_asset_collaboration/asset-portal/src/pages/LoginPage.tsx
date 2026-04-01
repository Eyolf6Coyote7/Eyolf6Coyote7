import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DemoTooltip } from "../components/DemoTooltip";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/assets");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blurs */}
      <div
        style={{
          position: "absolute",
          width: 256,
          height: 256,
          right: -80,
          top: -80,
          background: "rgba(70,72,212,0.05)",
          filter: "blur(32px)",
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 256,
          height: 256,
          left: -80,
          bottom: -80,
          background: "rgba(189,190,254,0.1)",
          filter: "blur(32px)",
          borderRadius: 9999,
        }}
      />

      <form onSubmit={handleSubmit} style={{ width: 390, maxWidth: "90vw", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
              marginBottom: 16,
            }}
          >
            <svg width="27" height="27" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="3" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: -0.7,
              margin: "0 0 4px",
            }}
          >
            AssetHub 3D
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            Manage your 3D assets on the go
          </p>
        </div>

        {/* Email */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            style={{ position: "absolute", left: 16, top: 15 }}
          >
            <rect x="2" y="4" width="16" height="12" rx="2" />
            <path d="M2 6L10 12L18 6" />
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: "100%",
              padding: "15px 16px 15px 48px",
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--text-primary)",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            style={{ position: "absolute", left: 16, top: 15 }}
          >
            <rect x="4" y="8" width="12" height="10" rx="2" />
            <path d="M7 8V5C7 3.3 8.3 2 10 2C11.7 2 13 3.3 13 5V8" />
          </svg>
          <input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "15px 48px 15px 48px",
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--text-primary)",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            style={{
              position: "absolute",
              right: 16,
              top: 15,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
            >
              <path d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z" />
              <circle cx="9" cy="6" r="2.5" />
            </svg>
          </button>
        </div>

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#4648D4",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </span>
        </div>

        {/* Sign In */}
        <DemoTooltip message={t("demo.loginRequired")}>
          <button
            type="submit"
            style={{
              width: "100%",
              height: 50,
              background: "linear-gradient(99deg, #4648D4 0%, #6063EE 100%)",
              border: "none",
              borderRadius: 10,
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#FFF",
              cursor: "pointer",
              boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1)",
              marginBottom: 32,
            }}
          >
            Sign In
          </button>
        </DemoTooltip>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)", opacity: 0.3 }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase" as const,
              color: "var(--text-muted)",
              padding: "0 16px",
              background: "var(--bg-primary)",
            }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)", opacity: 0.3 }} />
        </div>

        {/* Alt logins */}
        {["Sign in with API Key", "Sign in with SSO"].map((text) => (
          <button
            key={text}
            type="button"
            style={{
              width: "100%",
              height: 50,
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              cursor: "pointer",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10" fill="#4648D4">
              <ellipse cx="10" cy="5" rx="8" ry="4" />
            </svg>
            {text}
          </button>
        ))}

        {/* Footer */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text-secondary)",
            textAlign: "center",
            marginTop: 32,
          }}
        >
          Don't have an account?{" "}
          <span style={{ color: "#4648D4", cursor: "pointer", fontWeight: 600 }}>Contact your admin</span>
        </p>
      </form>
    </div>
  );
}
