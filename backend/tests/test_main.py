from fastapi.testclient import TestClient


def test_health_check(client: TestClient):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_requires_auth(client: TestClient):
    response = client.get("/")
    assert response.status_code == 401


def test_root_authenticated(client: TestClient):
    token = client.post("/auth/login", json={"username": "admin", "password": "admin123"}).json()[
        "access_token"
    ]
    response = client.get("/", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == {"message": "Hello admin"}
