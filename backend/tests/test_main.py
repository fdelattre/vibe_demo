from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_requires_auth():
    response = client.get("/")
    assert response.status_code == 401


def test_root_authenticated():
    token = client.post("/auth/login", json={"username": "admin", "password": "admin123"}).json()[
        "access_token"
    ]
    response = client.get("/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == {"message": "Hello admin"}
