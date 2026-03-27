import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Asset } from "../store/assetSlice";
import { api } from "../api";
import ThreeViewer from "../components/ThreeViewer";

const metadata = [
  { label: "FORMAT", value: "GLB", color: "#4648D4" },
  { label: "SIZE", value: "52 MB" },
  { label: "VERTICES", value: "124,500" },
  { label: "TEXTURES", value: "4" },
  { label: "CREATED", value: "2026-03-15" },
  { label: "BY", value: "Maya Chen" },
  { label: "UPDATED", value: "2026-03-20" },
];

const tags = ["shoe", "hero", "campaign-2026", "air-max"];
const versions = [
  { id: "v3", label: "v3 (Current)", date: "Today, 2:45 PM \u00b7 Maya Chen", current: true, badge: "APPROVED" },
  { id: "v2", label: "v2", date: "Yesterday, 10:20 AM \u00b7 Maya Chen", current: false },
  { id: "v1", label: "v1", date: "March 15, 2026 \u00b7 Maya Chen", current: false },
];
const shared = [
  { name: "Maya Chen", email: "maya.chen@brand.com", role: "OWNER" },
  { name: "Jake Liu", email: "jake.liu@studio.com", role: "EDITOR" },
];

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    if (id) api.fetchAssetById(id).then((a) => setAsset(a ?? null));
  }, [id]);

  const displayName = asset?.name || "Air Max 2026 \u2014 Hero Shot";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: 56,
          background: "#F1F3FF",
          flexShrink: 0,
        }}
      >
        <Link
          to="/assets"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: "#464554",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8 1L2 6.5L8 12" stroke="#464554" strokeWidth="1.5" />
          </svg>
          Back to Library
        </Link>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#141B2B",
            letterSpacing: -0.45,
          }}
        >
          {displayName}
        </span>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: "#FFFFFF",
              border: "1px solid #C7C4D7",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#464554",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" stroke="#464554" strokeWidth="1.5">
              <path d="M4 6L1 8V14H5V10H9V14H13V8L10 6" />
              <path d="M5 1H9L11 4H3L5 1Z" />
            </svg>
            Share
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "linear-gradient(135deg, #4648D4 0%, #6063EE 100%)",
              border: "none",
              borderRadius: 8,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#FFFFFF",
              cursor: "pointer",
              boxShadow: "0px 12px 40px rgba(20,27,43,0.06)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1V11M6 11L2 7M6 11L10 7" stroke="#FFF" strokeWidth="1.5" />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Main: 2 columns */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: 3D Canvas */}
        <div
          style={{
            flex: 1,
            background: "#1A1A2E",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ThreeViewer style={{ width: "100%", height: "100%" }} />

          {/* Top-left overlay */}
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(6px)",
              borderRadius: 9999,
              padding: "6px 12px",
            }}
          >
            {["GLB", "52 MB", "V3"].map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && (
                  <span style={{ width: 4, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.3)" }} />
                )}
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                  }}
                >
                  {t}
                </span>
              </span>
            ))}
          </div>

          {/* Center hint */}
          <div
            style={{
              position: "absolute",
              background: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(2px)",
              borderRadius: 9999,
              padding: "8px 16px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: 0.35,
              }}
            >
              Drag to rotate
            </span>
          </div>

          {/* Bottom-left toolbar */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0px 12px 40px rgba(20,27,43,0.06)",
              backdropFilter: "blur(12px)",
              borderRadius: 9999,
              padding: 6,
            }}
          >
            {["rotate", "zoom", "pan", "sep", "fullscreen"].map((btn, i) => {
              if (btn === "sep")
                return (
                  <div key={i} style={{ width: 1, height: 24, background: "rgba(199,196,215,0.3)", margin: "0 4px" }} />
                );
              const isActive = btn === "rotate";
              return (
                <div
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    background: isActive ? "#4648D4" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke={isActive ? "#FFF" : "#464554"}
                    strokeWidth="1.5"
                  >
                    {btn === "rotate" && (
                      <>
                        <path d="M3 9A6 6 0 0 1 15 9" />
                        <path d="M12 6L15 9L12 12" />
                      </>
                    )}
                    {btn === "zoom" && (
                      <>
                        <circle cx="8" cy="8" r="5" />
                        <path d="M12 12L16 16" />
                        <path d="M6 8H10M8 6V10" />
                      </>
                    )}
                    {btn === "pan" && (
                      <>
                        <path d="M9 2V16M2 9H16" />
                        <path d="M9 2L7 4M9 2L11 4M9 16L7 14M9 16L11 14M2 9L4 7M2 9L4 11M16 9L14 7M16 9L14 11" />
                      </>
                    )}
                    {btn === "fullscreen" && (
                      <>
                        <path d="M2 6V2H6M12 2H16V6M16 12V16H12M6 16H2V12" />
                      </>
                    )}
                  </svg>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div
          style={{
            width: 448,
            background: "#F1F3FF",
            borderLeft: "1px solid rgba(199,196,215,0.15)",
            overflowY: "auto",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {/* Asset Info */}
          <div>
            <span
              style={{
                display: "inline-block",
                background: "#E1E0FF",
                borderRadius: 6,
                padding: "2px 10px",
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase" as const,
                color: "#2F2EBE",
                marginBottom: 8,
              }}
            >
              NIKE
            </span>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: "#141B2B",
                letterSpacing: -0.6,
                margin: "0 0 8px",
              }}
            >
              {displayName}
            </h2>
            <p
              style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#464554", lineHeight: "23px", margin: 0 }}
            >
              Hero shot render of the Air Max 2026 for Q3 campaign. Final approved version.
            </p>
          </div>

          {/* Metadata */}
          <div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase" as const,
                color: "#464554",
                marginBottom: 16,
              }}
            >
              Metadata
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
              {metadata.map((m) => (
                <div key={m.label}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: "uppercase" as const,
                      color: "#767586",
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: m.color || "#141B2B",
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                    marginBottom: 4,
                  }}
                >
                  STATUS
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 9999, background: "#006C49" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#006C49" }}>
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase" as const,
                color: "#464554",
                marginBottom: 16,
              }}
            >
              Tags
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tags.map((t) => (
                <span
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#E1E8FD",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#141B2B",
                  }}
                >
                  {t}
                  <svg width="8" height="8" viewBox="0 0 8 8" style={{ cursor: "pointer" }}>
                    <path d="M1 1L7 7M7 1L1 7" stroke="#767586" strokeWidth="1.2" />
                  </svg>
                </span>
              ))}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px dashed #767586",
                  borderRadius: 8,
                  padding: "6px 12px",
                  background: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#767586",
                  cursor: "pointer",
                }}
              >
                + Add tag
              </button>
            </div>
          </div>

          {/* Version History */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#464554",
                  margin: 0,
                }}
              >
                Version History
              </h3>
              <Link
                to="/compare"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#4648D4",
                  textDecoration: "none",
                }}
              >
                Compare Versions
              </Link>
            </div>
            <div style={{ paddingLeft: 8 }}>
              {versions.map((v, i) => (
                <div
                  key={v.id}
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingBottom: i < versions.length - 1 ? 24 : 0,
                    position: "relative",
                  }}
                >
                  {i < versions.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 3,
                        top: 16,
                        bottom: 0,
                        width: 1.5,
                        borderLeft: "1px dashed #C7C4D7",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 9999,
                      background: v.current ? "#4648D4" : "#767586",
                      marginTop: 6,
                      flexShrink: 0,
                      boxShadow: v.current ? "0px 0px 0px 4px #E1E0FF" : "none",
                      zIndex: 1,
                    }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 14,
                          fontWeight: v.current ? 600 : 500,
                          color: "#141B2B",
                        }}
                      >
                        {v.label}
                      </span>
                      {v.badge && (
                        <span
                          style={{
                            background: "rgba(108,248,187,0.3)",
                            border: "1px solid rgba(0,108,73,0.2)",
                            borderRadius: 4,
                            padding: "2px 6px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: -0.5,
                            textTransform: "uppercase" as const,
                            color: "#006C49",
                          }}
                        >
                          {v.badge}
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: "#464554" }}>
                      {v.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shared With */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#464554",
                  margin: 0,
                }}
              >
                Shared With
              </h3>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "#4648D4",
                  cursor: "pointer",
                }}
              >
                Manage Access
              </span>
            </div>
            {shared.map((u) => (
              <div
                key={u.email}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9999,
                      background: "#D3DAEF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, color: "#464554" }}>
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#141B2B" }}>
                      {u.name}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: "#464554" }}>
                      {u.email}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                    color: "#767586",
                  }}
                >
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
