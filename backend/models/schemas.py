from pydantic import BaseModel
from typing import Optional, Dict, Any

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

# AI Generation schemas
class AIGenerateRequest(BaseModel):
    prompt: str
    size: Optional[str] = "32x32"
    style: Optional[str] = "pixel"
    colors: Optional[int] = 16

class AIGenerateResponse(BaseModel):
    success: bool
    pixel_data: Optional[Dict[str, Any]] = None
    width: int
    height: int
    message: Optional[str] = None

# Generic response schemas
class MessageResponse(BaseModel):
    message: str
    success: bool = True

class ErrorResponse(BaseModel):
    detail: str
    success: bool = False