from fastapi import FastAPI, HTTPException
import httpx
import json

def get_secrets():
    with open('secrets.json') as secrets_file:
        secrets = json.load(secrets_file)
    return secrets

app = FastAPI()

@app.get("/api/v1/books")
async def search_books(
    search_term: str = "",
):
    secrets = get_secrets()
    api_key = secrets.get("API_KEY")

    if not search_term.strip():
        return { "totalItems": 0, "items": [] }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.googleapis.com/books/v1/volumes",
                params={"q": search_term, "key": api_key}
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f'Server Error: {e}')