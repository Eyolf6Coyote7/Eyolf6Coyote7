import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store";
import { setAssets, setLoading } from "../store/assetSlice";
import { api } from "../api";

const formatColor: Record<string, string> = {
  GLB: "#4caf50",
  FBX: "#ff9800",
  OBJ: "#2196f3",
};

export default function AssetListPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s: RootState) => s.assets);

  useEffect(() => {
    dispatch(setLoading(true));
    api.fetchAssets().then((data) => {
      dispatch(setAssets(data));
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  if (loading) return <p style={{ color: "#8b8fa3" }}>Loading assets...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>3D Assets</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280, 1fr))", gap: 20 }}>
        {items.map((asset) => (
          <Link to={`/assets/${asset.id}`} key={asset.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                background: "#161822",
                borderRadius: 12,
                border: "1px solid #2a2d3a",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6c63ff")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2d3a")}
            >
              {/* Thumbnail placeholder */}
              <div
                style={{
                  height: 160,
                  background: "linear-gradient(135deg, #1a1d27, #252838)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    background: "#6c63ff33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "#6c63ff",
                  }}
                >
                  3D
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{asset.name}</h3>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: formatColor[asset.format] + "22",
                      color: formatColor[asset.format],
                      fontWeight: 600,
                    }}
                  >
                    {asset.format}
                  </span>
                  <span style={{ fontSize: 12, color: "#8b8fa3" }}>{asset.size}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {asset.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: "#2a2d3a",
                        color: "#8b8fa3",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
