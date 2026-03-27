from .auth import hash_password

# Stockage en mémoire — à remplacer par une base de données en production
_USERS: dict[str, str] = {
    "admin": hash_password("admin123"),
}


def get_hashed_password(username: str) -> str | None:
    return _USERS.get(username)
