import os
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import get_current_user
from .database import Base, SessionLocal, engine
from .routers.auth import router as auth_router
from .schemas import TokenData
from .users import create_user, get_user


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if not get_user(db, "admin"):
            create_user(db, "admin", os.getenv("ADMIN_PASSWORD", "admin123"))
    yield


app = FastAPI(title="Gestion de Chantier API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/")
def root(current: TokenData = Depends(get_current_user)):
    return {"message": f"Hello {current.username}"}
