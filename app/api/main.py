from fastapi import FastAPI, HTTPException
import httpx
import json


def get_secrets():
    with open("secrets.json") as secrets_file:
        secrets = json.load(secrets_file)
    return secrets


app = FastAPI()
google_books_api = "https://www.googleapis.com/books/v1/volumes"


async def fetch_google_books(url):

    secrets = get_secrets()
    api_key = secrets.get("API_KEY")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params={"key": api_key})
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code, detail=f"Google Books API Error: {e}"
        )
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"Server Error: {e}")
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"JSON Decode Error: {e}")


@app.get("/api/v1/books")
async def search_books(
    search_term: str = "",
):

    if not search_term.strip():
        return {"totalItems": 0, "items": []}

    url = f"{google_books_api}?q={search_term}"
    return await fetch_google_books(url)

@app.get("/api/v1/books/{book_id}")
async def get_book_by_id(
    book_id: str
):
    url = f"{google_books_api}/{book_id}"
    return await fetch_google_books(url)
