from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import get_current_user
from .routers.auth import router as auth_router
from .schemas import TokenData

app = FastAPI(title="Gestion de Chantier API", version="0.1.0")

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
