from fastapi import APIRouter, HTTPException, status, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from auth import get_current_user
from models.project import ProjectCreate, ProjectUpdate, ProjectResponse
from models.schemas import MessageResponse
from models.database_models import User, Project

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project_data: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Create a new pixel art project"""
    db_project = Project(
        **project_data.dict(),
        user_id=current_user.id
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return db_project

@router.get("/", response_model=List[ProjectResponse])
def get_user_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """Get all projects for the current user"""
    projects = db.query(Project).filter(
        Project.user_id == current_user.id
    ).order_by(Project.created_at.desc()).offset(skip).limit(limit).all()
    
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get a specific project by ID"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int, 
    project_update: ProjectUpdate, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a specific project"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Update project fields
    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    
    return project

@router.delete("/{project_id}", response_model=MessageResponse)
def delete_project(project_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Delete a specific project"""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.user_id == current_user.id
    ).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db.delete(project)
    db.commit()
    
    return MessageResponse(message="Project deleted successfully")

@router.get("/public/list", response_model=List[ProjectResponse])
def get_public_projects(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """Get public projects (no authentication required)"""
    projects = db.query(Project).filter(
        Project.is_public == True
    ).order_by(Project.created_at.desc()).offset(skip).limit(limit).all()
    
    return projects