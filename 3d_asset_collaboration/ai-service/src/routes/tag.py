from fastapi import APIRouter, File, UploadFile

from src.models.tagger import MOCK_TAGS, tagger

router = APIRouter(prefix="/api/tag", tags=["tagging"])


@router.post("")
async def tag_asset(file: UploadFile = File(...)):
    """Accept a thumbnail image and return AI-generated tags."""
    image_bytes = await file.read()
    tags = tagger.predict(image_bytes)
    return {"tags": tags, "filename": file.filename}


@router.post("/mock")
async def tag_asset_mock():
    """Return mock tags without requiring an image upload."""
    return {"tags": MOCK_TAGS, "mock": True}
