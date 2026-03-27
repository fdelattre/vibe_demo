import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def get_token(username: str = "admin", password: str = "admin123") -> str:
    return client.post("/auth/login", json={"username": username, "password": password}).json()[
        "access_token"
    ]


def test_login_success():
    response = client.post("/auth/login", json={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.parametrize(
    "username,password",
    [
        ("admin", "mauvais_mdp"),
        ("inconnu", "admin123"),
        ("", ""),
    ],
)
def test_login_failure(username: str, password: str):
    response = client.post("/auth/login", json={"username": username, "password": password})
    assert response.status_code == 401


def test_me_authenticated():
    token = get_token()
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == {"username": "admin"}


def test_me_unauthenticated():
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_me_invalid_token():
    response = client.get("/auth/me", headers={"Authorization": "Bearer token_bidon"})
    assert response.status_code == 401
