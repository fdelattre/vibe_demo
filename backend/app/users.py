from sqlalchemy.orm import Session

from .auth import hash_password
from .models import User


def get_user(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()


def create_user(
    db: Session,
    username: str,
    password: str,
    first_name: str | None = None,
    last_name: str | None = None,
) -> User:
    user = User(
        username=username,
        hashed_password=hash_password(password),
        first_name=first_name,
        last_name=last_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
