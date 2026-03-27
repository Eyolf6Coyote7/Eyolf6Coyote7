"""Tests for AssetTagger (mock mode only — no ONNX model needed)."""

import io

import numpy as np
from PIL import Image

from src.models.tagger import DEFAULT_LABELS, MOCK_TAGS, AssetTagger


class TestAssetTaggerMock:
    def test_predict_returns_mock_tags_in_mock_mode(self):
        tagger = AssetTagger()  # MOCK_MODE=True by default
        tags = tagger.predict(b"fake image bytes")
        assert len(tags) == 5
        assert tags[0]["tag"] == "character"
        assert tags[0]["confidence"] == 0.95

    def test_predict_respects_top_k(self):
        tagger = AssetTagger()
        tags = tagger.predict(b"fake", top_k=3)
        assert len(tags) == 3

    def test_predict_top_k_greater_than_available(self):
        tagger = AssetTagger()
        tags = tagger.predict(b"fake", top_k=10)
        assert len(tags) == len(MOCK_TAGS)

    def test_mock_tags_have_correct_structure(self):
        for tag in MOCK_TAGS:
            assert "tag" in tag
            assert "confidence" in tag
            assert 0 <= tag["confidence"] <= 1

    def test_default_labels_count(self):
        assert len(DEFAULT_LABELS) == 20


class TestPreprocess:
    def test_preprocess_returns_correct_shape(self):
        tagger = AssetTagger()
        # Create a small test image
        img = Image.new("RGB", (100, 100), color="red")
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        image_bytes = buf.getvalue()

        result = tagger._preprocess(image_bytes)
        assert result.shape == (1, 3, 224, 224)
        assert result.dtype == np.float32

    def test_preprocess_normalizes_to_0_1(self):
        tagger = AssetTagger()
        img = Image.new("RGB", (50, 50), color=(128, 128, 128))
        buf = io.BytesIO()
        img.save(buf, format="PNG")

        result = tagger._preprocess(buf.getvalue())
        assert result.min() >= 0.0
        assert result.max() <= 1.0
