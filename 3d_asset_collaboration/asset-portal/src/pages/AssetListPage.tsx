import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";
import { setAssets, setLoading } from "../store/assetSlice";
import { api } from "../api";

const mockAssets = [
  {
    id: "1",
    name: "Air Max V-Core 2026",
    format: "GLB",
    size: "52 MB",
    version: "v3",
    brand: "Nike",
    timeAgo: "3D AGO",
  },
  {
    id: "2",
    name: "Titanium Chronos X",
    format: "GLB",
    size: "124 MB",
    version: "v1",
    brand: "Nike",
    timeAgo: "5D AGO",
  },
  {
    id: "3",
    name: "Spatial Audio Pro H1",
    format: "GLB",
    size: "86 MB",
    version: "v4",
    brand: "Nike",
    timeAgo: "1W AGO",
  },
  { id: "4", name: "Eco-Tough Flask", format: "GLB", size: "34 MB", version: "v2", brand: "Nike", timeAgo: "2W AGO" },
  {
    id: "5",
    name: "Urban Nomad Pack",
    format: "GLB",
    size: "112 MB",
    version: "v5",
    brand: "Nike",
    timeAgo: "1MO AGO",
  },
  {
    id: "6",
    name: "Velocity Vision Goggles",
    format: "GLB",
    size: "18 MB",
    version: "v2",
    brand: "Nike",
    timeAgo: "2MO AGO",
  },
];

export default function AssetListPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((st: RootState) => st.assets);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    dispatch(setLoading(true));
    api.fetchAssets().then((data) => {
      dispatch(setAssets(data));
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  const displayAssets =
    mockAssets.length > 0
      ? mockAssets
      : items.map((a) => ({
          id: a.id,
          name: a.name,
          format: a.format,
          size: a.size,
          version: "v1",
          brand: "Nike",
          timeAgo: "recently",
        }));

  if (loading)
    return <p style={{ padding: 32, color: "#767586", fontFamily: "Inter, sans-serif" }}>{t("assets.loading")}</p>;

  return (
    <div style={{ padding: 32 }}>
      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#141B2B",
              letterSpacing: -0.7,
            }}
          >
            {t("assets.title")}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#767586", marginLeft: 12 }}>
            {t("assets.totalPieces", { count: 247 })}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "8px 10px",
                background: viewMode === "grid" ? "#EEF2FF" : "#FFF",
                border: "none",
                cursor: "pointer",
                color: viewMode === "grid" ? "#4648D4" : "#64748B",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: "8px 10px",
                background: viewMode === "list" ? "#EEF2FF" : "#FFF",
                border: "none",
                cursor: "pointer",
                color: viewMode === "list" ? "#4648D4" : "#64748B",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 3H15M1 8H15M1 13H15" />
              </svg>
            </button>
          </div>
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
              fontWeight: 500,
              color: "#141B2B",
              cursor: "pointer",
            }}
          >
            {t("assets.newest")}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#141B2B" strokeWidth="1.5" />
            </svg>
          </button>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "10px 24px",
                background: "#4648D4",
                color: "#FFF",
                border: "none",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              + {t("assets.uploadAsset")}
            </button>
          </Link>
        </div>
      </div>

      {/* Asset Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {displayAssets.map((asset) => (
          <Link
            to={`/assets/${asset.id}`}
            key={asset.id}
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              overflow: "hidden",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                height: 208,
                background: "#1A1A2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(6px)",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#FFF",
                  letterSpacing: 0.5,
                  textTransform: "uppercase" as const,
                }}
              >
                {asset.format}
              </span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity="0.3">
                <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="#C7C4D7" strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{ padding: 16 }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}
              >
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 700, color: "#191C1D" }}>
                  {asset.name}
                </span>
                <span
                  style={{
                    background: "#E1E0FF",
                    borderRadius: 4,
                    padding: "2px 6px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#4648D4",
                  }}
                >
                  {asset.version}
                </span>
              </div>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(70,72,212,0.05)",
                  border: "1px solid rgba(70,72,212,0.2)",
                  borderRadius: 6,
                  padding: "2px 8px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#4648D4",
                  marginBottom: 12,
                }}
              >
                {asset.brand}
              </span>
              <div style={{ height: 1, background: "rgba(199,196,215,0.1)", margin: "8px 0" }} />
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#767586",
                  textTransform: "uppercase" as const,
                }}
              >
                <span>{asset.size}</span>
                <span>{asset.timeAgo}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 48 }}>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M7 1L1 6L7 11" stroke="#585F6A" strokeWidth="1.5" />
          </svg>
        </button>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: n === 1 ? 700 : 600,
              background: n === 1 ? "#4648D4" : "transparent",
              color: n === 1 ? "#FFF" : "#141B2B",
              boxShadow: n === 1 ? "0px 10px 15px -3px rgba(70,72,212,0.2)" : "none",
            }}
          >
            {n}
          </button>
        ))}
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#767586", padding: "0 8px" }}>...</span>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            background: "transparent",
            color: "#141B2B",
          }}
        >
          12
        </button>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M1 1L7 6L1 11" stroke="#585F6A" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
