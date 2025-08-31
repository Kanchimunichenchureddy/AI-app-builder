from fastapi import APIRouter, HTTPException, status, Depends
from auth import get_current_user
from models.schemas import AIGenerateRequest, AIGenerateResponse
from models.database_models import User
import random

router = APIRouter(prefix="/ai", tags=["ai-generation"])

@router.post("/generate", response_model=AIGenerateResponse)
async def generate_pixel_art(
    request: AIGenerateRequest, 
    current_user: User = Depends(get_current_user)
):
    """Generate pixel art based on prompt (placeholder implementation)"""
    
    # Parse size
    try:
        width, height = map(int, request.size.split('x'))
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid size format. Use format like '32x32'"
        )
    
    if width > 128 or height > 128:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum size is 128x128"
        )
    
    # Generate dummy pixel data
    pixel_data = generate_dummy_pixel_art(width, height, request.prompt, request.style)
    
    return AIGenerateResponse(
        success=True,
        pixel_data=pixel_data,
        width=width,
        height=height,
        message=f"Generated {width}x{height} pixel art for prompt: '{request.prompt}'"
    )

def generate_dummy_pixel_art(width: int, height: int, prompt: str, style: str) -> dict:
    """Generate dummy pixel art data for demonstration"""
    
    # Define color palettes based on style
    color_palettes = {
        "pixel": ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"],
        "retro": ["#2D1B69", "#11A3E2", "#F2E863", "#E23838", "#7A2048", "#553C9A", "#B14156", "#6F2DA8"],
        "modern": ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51", "#E63946", "#F77F00", "#FCBF49"]
    }
    
    palette = color_palettes.get(style, color_palettes["pixel"])
    
    # Generate simple pattern based on prompt
    pixels = []
    for y in range(height):
        row = []
        for x in range(width):
            # Simple pattern generation
            if "heart" in prompt.lower():
                color = generate_heart_pattern(x, y, width, height, palette)
            elif "star" in prompt.lower():
                color = generate_star_pattern(x, y, width, height, palette)
            else:
                color = random.choice(palette)
            row.append(color)
        pixels.append(row)
    
    return {
        "pixels": pixels,
        "palette": palette,
        "prompt": prompt,
        "style": style
    }

def generate_heart_pattern(x: int, y: int, width: int, height: int, palette: list) -> str:
    """Generate a simple heart pattern"""
    center_x, center_y = width // 2, height // 2
    if abs(x - center_x) + abs(y - center_y) <= min(width, height) // 4:
        return palette[2]  # Red color
    return palette[0]  # Background

def generate_star_pattern(x: int, y: int, width: int, height: int, palette: list) -> str:
    """Generate a simple star pattern"""
    center_x, center_y = width // 2, height // 2
    if (abs(x - center_x) <= 2 and abs(y - center_y) <= 6) or (abs(x - center_x) <= 6 and abs(y - center_y) <= 2):
        return palette[3]  # Star color
    return palette[0]  # Background

@router.get("/styles", response_model=dict)
async def get_available_styles():
    """Get available art styles"""
    return {
        "styles": [
            {"name": "pixel", "description": "Classic pixel art style"},
            {"name": "retro", "description": "Retro gaming inspired colors"},
            {"name": "modern", "description": "Modern color palette"}
        ],
        "sizes": ["16x16", "32x32", "64x64", "128x128"],
        "max_colors": 64
    }