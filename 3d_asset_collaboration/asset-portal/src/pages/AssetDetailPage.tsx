import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Asset } from "../store/assetSlice";
import { api } from "../api";
import ThreeViewer from "../components/ThreeViewer";
import { DemoTooltip } from "../components/DemoTooltip";

function buildMetadata(asset: Asset) {
  return [
    { label: "FORMAT", value: asset.format, color: "#4648D4" },
    { label: "SIZE", value: asset.size },
    { label: "CREATED", value: asset.createdAt },
    { label: "BY", value: asset.author },
  ];
}

function buildVersions(asset: Asset) {
  return [
    { id: "v1", label: "v1 (Current)", date: `${asset.createdAt} · ${asset.author}`, current: true, badge: "APPROVED" },
  ];
}

function buildShared(asset: Asset) {
  return [
    { name: asset.author, email: `${asset.author.toLowerCase().replace(/\s+/g, ".")}@studio.com`, role: "OWNER" },
  ];
}

export default function AssetDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    if (id) api.fetchAssetById(id).then((a) => setAsset(a ?? null));
  }, [id]);

  if (!asset) {
    return <p style={{ padding: 32, color: "var(--text-muted)", fontFamily: "Inter, sans-serif" }}>Loading...</p>;
  }

  const displayName = asset.name;
  const metadata = buildMetadata(asset);
  const tags = asset.tags;
  const versions = buildVersions(asset);
  const shared = buildShared(asset);

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
          background: "var(--bg-elevated)",
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
            color: "var(--text-secondary)",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8 1L2 6.5L8 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Back to Library
        </Link>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: -0.45,
          }}
        >
          {displayName}
        </span>
        <div style={{ display: "flex", gap: 12 }}>
          <DemoTooltip message={t("demo.shareRequired")}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6L1 8V14H5V10H9V14H13V8L10 6" />
                <path d="M5 1H9L11 4H3L5 1Z" />
              </svg>
              Share
            </button>
          </DemoTooltip>
          <DemoTooltip message={t("demo.downloadRequired")}>
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
          </DemoTooltip>
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
            {[asset.format, asset.size, "V1"].map((t, i) => (
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
            background: "var(--bg-elevated)",
            borderLeft: "1px solid var(--border)",
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
                background: "var(--accent-surface)",
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
              {asset.author.toUpperCase()}
            </span>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: -0.6,
                margin: "0 0 8px",
              }}
            >
              {displayName}
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: "23px",
                margin: 0,
              }}
            >
              {asset.description}
            </p>
          </div>

          {/* Metadata */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase" as const,
                  color: "var(--text-secondary)",
                  margin: 0,
                }}
              >
                Metadata
              </h3>
              <DemoTooltip message={t("demo.editMetadataRequired")}>
                <button
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                    color: "#4648D4",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Edit Metadata
                </button>
              </DemoTooltip>
            </div>
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
                      color: "var(--text-muted)",
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
                      color: m.color || "var(--text-primary)",
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
                    color: "var(--text-muted)",
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
                color: "var(--text-secondary)",
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
                    background: "var(--accent-surface)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {t}
                  <svg width="8" height="8" viewBox="0 0 8 8" style={{ cursor: "pointer" }}>
                    <path d="M1 1L7 7M7 1L1 7" stroke="var(--text-muted)" strokeWidth="1.2" />
                  </svg>
                </span>
              ))}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px dashed var(--text-muted)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  background: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-muted)",
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
                  color: "var(--text-secondary)",
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
                        borderLeft: "1px dashed var(--border)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 9999,
                      background: v.current ? "#4648D4" : "var(--text-muted)",
                      marginTop: 6,
                      flexShrink: 0,
                      boxShadow: v.current ? "0px 0px 0px 4px var(--accent-surface)" : "none",
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
                          color: "var(--text-primary)",
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
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                      }}
                    >
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
                  color: "var(--text-secondary)",
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
                      background: "var(--accent-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {u.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "var(--text-secondary)",
                      }}
                    >
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
                    color: "var(--text-muted)",
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
