import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Asset } from "../store/assetSlice";
import { api } from "../api";
import ThreeViewer from "../components/ThreeViewer";

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    if (id) api.fetchAssetById(id).then((a) => setAsset(a ?? null));
  }, [id]);

  if (!asset) return <p style={{ color: "#8b8fa3" }}>Loading...</p>;

  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {/* 3D Viewer */}
      <div style={{ flex: "1 1 500px", minHeight: 450 }}>
        <Link
          to="/assets"
          style={{ color: "#6c63ff", fontSize: 13, textDecoration: "none", marginBottom: 12, display: "inline-block" }}
        >
          &larr; Back to Assets
        </Link>
        <ThreeViewer style={{ marginTop: 8 }} />
      </div>

      {/* Info Sidebar */}
      <div
        style={{ flex: "0 0 300px", background: "#161822", borderRadius: 12, border: "1px solid #2a2d3a", padding: 24 }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{asset.name}</h2>
        <Info label="Format" value={asset.format} />
        <Info label="Size" value={asset.size} />
        <Info label="Author" value={asset.author} />
        <Info label="Created" value={asset.createdAt} />
        <p style={{ fontSize: 13, color: "#8b8fa3", marginTop: 16, lineHeight: 1.6 }}>{asset.description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16 }}>
          {asset.tags.map((t) => (
            <span
              key={t}
              style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#2a2d3a", color: "#8b8fa3" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ fontSize: 13, color: "#8b8fa3" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
    </div>
  );
}
