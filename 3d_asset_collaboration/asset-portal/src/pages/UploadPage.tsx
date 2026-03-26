import { useState, useCallback } from "react";

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Upload 3D Assets</h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? "#6c63ff" : "#2a2d3a"}`,
          borderRadius: 16,
          padding: 64,
          textAlign: "center",
          background: dragging ? "#6c63ff0a" : "#161822",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".glb,.fbx,.obj,.gltf"
          style={{ display: "none" }}
          onChange={handleFileInput}
        />
        <div style={{ fontSize: 40, marginBottom: 12, color: "#6c63ff" }}>+</div>
        <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Drop 3D files here or click to browse</p>
        <p style={{ fontSize: 13, color: "#8b8fa3" }}>Supports GLB, FBX, OBJ, glTF</p>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Queued Files</h3>
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: "#161822",
                borderRadius: 8,
                marginBottom: 8,
                border: "1px solid #2a2d3a",
              }}
            >
              <span style={{ fontSize: 13 }}>{f.name}</span>
              <span style={{ fontSize: 12, color: "#8b8fa3" }}>{(f.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          ))}
          <button
            style={{
              marginTop: 12,
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#6c63ff",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Upload All
          </button>
        </div>
      )}
    </div>
  );
}
