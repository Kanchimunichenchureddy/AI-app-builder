from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    pixel_data: Optional[Dict[str, Any]] = None
    width: Optional[int] = Field(None, ge=1, le=1000)
    height: Optional[int] = Field(None, ge=1, le=1000)
    tags: Optional[List[str]] = []
    is_public: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    pixel_data: Optional[Dict[str, Any]] = None
    width: Optional[int] = Field(None, ge=1, le=1000)
    height: Optional[int] = Field(None, ge=1, le=1000)
    tags: Optional[List[str]] = None
    is_public: Optional[bool] = None

class ProjectResponse(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True