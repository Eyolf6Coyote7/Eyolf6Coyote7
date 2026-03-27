import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { DemoTooltip } from "../components/DemoTooltip";

const isMock = import.meta.env.VITE_MOCK === "true";

const stepKeys = ["upload.dropzone", "upload.metadata", "common.submit"];
const aiTags = ["shoe", "sneaker", "hero-shot"];

export default function UploadPage() {
  const { t } = useTranslation();
  const steps = stepKeys.map((k) => t(k));
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    name: "product-hero-2026",
    brand: "Acme Studio",
    description: "",
    tags: ["Footwear"],
  });

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      simulateProgress();
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      simulateProgress();
    }
  };

  const simulateProgress = () => {
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 68) {
          clearInterval(iv);
          return 68;
        }
        return p + 4;
      });
    }, 100);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "48px 16px 80px", minHeight: "100%" }}>
      <div
        style={{
          width: 800,
          maxWidth: "100%",
          background: "var(--bg-surface)",
          boxShadow: "var(--card-shadow)",
          borderRadius: 8,
          position: "relative",
          padding: "32px",
        }}
      >
        {/* Step Indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            marginBottom: 48,
            position: "relative",
          }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 80,
              right: 80,
              height: 2,
              background: "var(--border)",
              zIndex: 0,
            }}
          />
          {steps.map((label, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                zIndex: 1,
                cursor: "pointer",
              }}
              onClick={() => setStep(i)}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i <= step ? "#4648D4" : "var(--accent-surface)",
                  boxShadow: i === step ? "0px 0px 0px 4px rgba(70,72,212,0.1)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: i <= step ? "#FFFFFF" : "var(--text-primary)",
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: i <= step ? "#4648D4" : "var(--text-muted)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 0: Upload Zone */}
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
              style={{
                height: 280,
                background: dragging ? "var(--accent-surface)" : "var(--bg-elevated)",
                border: "2px dashed var(--border)",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <input
                id="file-input"
                type="file"
                accept=".glb,.fbx,.obj,.gltf"
                style={{ display: "none" }}
                onChange={handleFileInput}
              />
              <svg width="44" height="32" viewBox="0 0 44 32" fill="none" style={{ marginBottom: 16, opacity: 0.4 }}>
                <path d="M22 0L32 10H26V20H18V10H12L22 0Z" fill="currentColor" />
                <path d="M0 28H44V32H0V28Z" fill="currentColor" />
              </svg>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 16,
                }}
              >
                Drag and drop your 3D file here
              </span>
              <button
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid #4648D4",
                  borderRadius: 4,
                  padding: "10px 24px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#4648D4",
                  cursor: "pointer",
                }}
              >
                Browse Files
              </button>
              <span
                style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 16 }}
              >
                Supports: GLB, FBX, OBJ. Max 500MB
              </span>
            </div>

            {file && (
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--accent-surface)",
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#4648D4">
                      <path d="M4 2H12L16 6V18H4V2Z" />
                    </svg>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                          }}
                        >
                          {file.name}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>
                          {(file.size / 1024 / 1024).toFixed(0)} MB
                        </span>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10">
                          <path d="M1 1L9 9M9 1L1 9" stroke="#BA1A1A" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: 8,
                        background: "var(--accent-surface)",
                        borderRadius: 12,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          height: "100%",
                          background: "#4648D4",
                          borderRadius: 12,
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>
                      {progress}% &middot; {Math.round(((file.size / 1024 / 1024) * progress) / 100)} MB /{" "}
                      {(file.size / 1024 / 1024).toFixed(0)} MB &middot; ~12s remaining
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setStep(1)}
                disabled={!file}
                style={{
                  padding: "10px 32px",
                  background: file ? "#4648D4" : "var(--accent-surface)",
                  color: file ? "#FFF" : "var(--text-muted)",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: file ? "pointer" : "default",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Metadata */}
        {step === 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
            }}
          >
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    textTransform: "uppercase" as const,
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Asset Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: 4,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "var(--text-primary)",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    textTransform: "uppercase" as const,
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Brand
                </label>
                <select
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: 4,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    color: "var(--text-primary)",
                    boxSizing: "border-box",
                    appearance: "auto",
                  }}
                >
                  <option>Acme Studio</option>
                  <option>Vertex Labs</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase" as const,
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Provide architectural context or usage guidelines..."
                style={{
                  width: "100%",
                  height: 84,
                  padding: 12,
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: "var(--text-primary)",
                  resize: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase" as const,
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Tags &amp; AI Suggestions
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      background: "var(--accent-surface)",
                      borderRadius: 12,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {tag}
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      style={{ cursor: "pointer" }}
                      onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })}
                    >
                      <path d="M1 1L7 7M7 1L1 7" stroke="var(--text-primary)" strokeWidth="1.2" />
                    </svg>
                  </span>
                ))}
                {aiTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setForm({ ...form, tags: [...form.tags, tag] })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 12px",
                      background: "var(--accent-surface)",
                      border: "1px dashed rgba(70,72,212,0.4)",
                      borderRadius: 12,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#4648D4",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#4648D4">
                      <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                    </svg>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setStep(0)}
                style={{
                  padding: "10px 24px",
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: "10px 32px",
                  background: "#4648D4",
                  color: "#FFF",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review & Submit */}
        {step === 2 && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: 24,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--bg-elevated)",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--accent-surface)",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L28 8V24L16 30L4 24V8L16 2Z" stroke="#4648D4" strokeWidth="1.5" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Final Package Preview
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "var(--text-muted)" }}>
                  1 Asset &middot; {form.tags.length} Tags &middot; {file?.name || "air-max-2026-hero.glb"} &middot;{" "}
                  {file ? (file.size / 1024 / 1024).toFixed(1) : "52.4"}MB
                </div>
              </div>
            </div>

            <DemoTooltip message={t("demo.uploadRequired")}>
              <button
                onClick={() => setStep(0)}
                style={{
                  width: "100%",
                  height: 48,
                  background: "#4648D4",
                  border: "none",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  cursor: "pointer",
                  boxShadow: "0px 10px 15px -3px rgba(70,72,212,0.2)",
                }}
              >
                Upload Asset
              </button>
            </DemoTooltip>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                color: "var(--text-muted)",
                textAlign: "center",
              }}
            >
              By uploading, you agree to the Architecture Curator Terms of Service.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: "10px 24px",
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
