from __future__ import annotations

import io
from pathlib import Path

import numpy as np
from PIL import Image

from src.config import settings

MOCK_TAGS = [
    {"tag": "character", "confidence": 0.95},
    {"tag": "low-poly", "confidence": 0.88},
    {"tag": "rigged", "confidence": 0.82},
    {"tag": "fantasy", "confidence": 0.76},
    {"tag": "humanoid", "confidence": 0.71},
]

# Label set used when a real model is loaded
DEFAULT_LABELS = [
    "character",
    "vehicle",
    "environment",
    "prop",
    "weapon",
    "architecture",
    "furniture",
    "nature",
    "animal",
    "robot",
    "low-poly",
    "high-poly",
    "rigged",
    "animated",
    "textured",
    "fantasy",
    "sci-fi",
    "realistic",
    "stylized",
    "humanoid",
]


class AssetTagger:
    """ONNX-based 3D asset thumbnail tagger."""

    def __init__(self) -> None:
        self._session = None
        self._labels = DEFAULT_LABELS
        if not settings.MOCK_MODE:
            self._load_model()

    def _load_model(self) -> None:
        import onnxruntime as ort

        model_path = Path(settings.MODEL_PATH)
        if not model_path.exists():
            raise FileNotFoundError(f"ONNX model not found at {model_path}")
        self._session = ort.InferenceSession(str(model_path))

    def _preprocess(self, image_bytes: bytes) -> np.ndarray:
        """Resize image to 224x224 and normalize to float32 NCHW tensor."""
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((224, 224))
        arr = np.array(img, dtype=np.float32) / 255.0
        # HWC -> CHW -> NCHW
        arr = np.transpose(arr, (2, 0, 1))
        return np.expand_dims(arr, axis=0)

    def predict(self, image_bytes: bytes, top_k: int = 5) -> list[dict]:
        """Return top-k tags with confidence scores."""
        if settings.MOCK_MODE or self._session is None:
            return MOCK_TAGS[:top_k]

        tensor = self._preprocess(image_bytes)
        input_name = self._session.get_inputs()[0].name
        outputs = self._session.run(None, {input_name: tensor})
        scores = outputs[0][0]

        # Apply softmax
        exp_scores = np.exp(scores - np.max(scores))
        probs = exp_scores / exp_scores.sum()

        top_indices = np.argsort(probs)[::-1][:top_k]
        return [
            {"tag": self._labels[i] if i < len(self._labels) else f"class_{i}", "confidence": round(float(probs[i]), 4)}
            for i in top_indices
        ]


# Singleton
tagger = AssetTagger()
