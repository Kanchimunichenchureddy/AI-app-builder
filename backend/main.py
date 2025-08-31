from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Import database and create tables
from database import create_tables, settings

# Import routes
from routes import auth, projects, ai

# Create tables on startup
create_tables()

# Create FastAPI app
app = FastAPI(
    title="Pixel Builder AI Backend",
    description="Backend API for Pixel Builder AI application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "success": False
        }
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Pixel Builder AI Backend is running"}

# Include routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")
app.include_router(ai.router, prefix="/api/v1")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Pixel Builder AI Backend",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )