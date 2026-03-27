from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str
    first_name: str | None = None
    last_name: str | None = None


class UserOut(BaseModel):
    username: str
    first_name: str | None = None
    last_name: str | None = None
