import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UnityLoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(64% 80% at 50% 50%, #1E1E3A 0%, #111125 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glowing orbs */}
      <div
        style={{
          position: "absolute",
          width: 512,
          height: 410,
          left: -128,
          top: -102,
          background: "rgba(192,193,255,0.1)",
          filter: "blur(60px)",
          borderRadius: 12,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 384,
          height: 307,
          right: -128,
          bottom: -102,
          background: "rgba(96,1,209,0.1)",
          filter: "blur(60px)",
          borderRadius: 12,
        }}
      />

      <div
        style={{
          width: 440,
          background: "#252547",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0px 20px 40px rgba(13,0,150,0.25)",
          borderRadius: 8,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", padding: "40px 32px 24px" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 4,
              background: "#8083FF",
              boxShadow: "0px 0px 15px rgba(128,131,255,0.4)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <svg width="25" height="25" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L16 5V13L9 17L2 13V5L9 1Z" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="9" r="3" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 24,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: -0.6,
              margin: "0 0 4px",
            }}
          >
            AssetHub 3D
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "#C7C4D7",
              opacity: 0.7,
              margin: 0,
            }}
          >
            Unity Client
          </p>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

        {/* Form */}
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.6,
                textTransform: "uppercase" as const,
                color: "#C7C4D7",
                display: "block",
                marginBottom: 8,
              }}
            >
              API Key
            </label>
            <div style={{ position: "relative" }}>
              <svg
                width="19"
                height="10"
                viewBox="0 0 19 10"
                fill="#C7C4D7"
                style={{ position: "absolute", left: 16, top: 19 }}
              >
                <ellipse cx="9.5" cy="5" rx="8" ry="4" />
              </svg>
              <input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxxx-xxxx-xxxx"
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 48px",
                  background: "#0C0C1F",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 16,
                  color: "rgba(70,69,84,0.5)",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              style={{ width: 16, height: 16, accentColor: "#6366F1" }}
            />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#C7C4D7" }}>
              Remember this key
            </span>
          </label>

          <button
            onClick={() => navigate("/unity/browser")}
            style={{
              width: "100%",
              height: 48,
              background: "#6366F1",
              border: "none",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#FFF",
              cursor: "pointer",
              boxShadow: "0px 10px 15px -3px rgba(49,46,129,0.2)",
            }}
          >
            Connect to Workspace
          </button>

          <p
            style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#464554", textAlign: "center", margin: 0 }}
          >
            Need assistance? <span style={{ color: "#6366F1", cursor: "pointer" }}>Get API Key</span>
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: 24 }}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              letterSpacing: 1,
              textTransform: "uppercase" as const,
              color: "#464554",
              opacity: 0.5,
            }}
          >
            V2.0.0 &middot; ASSETHUB 3D UNITY CLIENT
          </span>
        </div>
      </div>
    </div>
  );
}
