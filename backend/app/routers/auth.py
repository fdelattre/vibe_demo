from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status

from ..auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    get_current_user,
    verify_password,
)
from ..schemas import Token, TokenData, UserLogin, UserOut
from ..users import get_hashed_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(credentials: UserLogin):
    hashed = get_hashed_password(credentials.username)
    if not hashed or not verify_password(credentials.password, hashed):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiants incorrects",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(
        {"sub": credentials.username},
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=token, token_type="bearer")


@router.get("/me", response_model=UserOut)
def me(current: TokenData = Depends(get_current_user)):
    return UserOut(username=current.username)
