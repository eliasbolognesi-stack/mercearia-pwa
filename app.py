from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, get_db
from models import Base, Usuario
from schemas import Usuario
import os

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mercearia API")

# CORS for PWA
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Demo data
usuarios_demo = [
    {"id": 1, "nome": "João Silva", "email": "joao@email.com"},
    {"id": 2, "nome": "Maria Santos", "email": "maria@email.com"},
]

@app.get("/api/usuarios", response_model=list[Usuario])
def read_usuarios(db: Session = Depends(get_db)):
    # Demo (add real CRUD later)
    return usuarios_demo

@app.get("/")
def root():
    return {"message": "Mercearia API rodando! /api/usuarios"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

