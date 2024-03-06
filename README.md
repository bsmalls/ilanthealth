## Developing Locally

You can clone & create this repo with the following command

```bash
npx create-next-app brian-smallbeck-test --example "https://github.com/bsmalls/ilanthealth"
```


## Getting Started

First, be sure to get your [Google Books API key](https://developers.google.com/books/docs/v1/using#APIKey). Once obtained, create a `secrets.json` file in the project root, and add an object in the following format:

```json
{
    "API_KEY":"your_api_key_here"
}
```

Then, run the development server:

```bash
npm run next-dev
# or
yarn next-dev
# or
pnpm next-dev
# or
bun next-dev
```

And then run the API server:

```bash
npm run fastapi-dev
# or
yarn fastapi-dev
# or
pnpm fastapi-dev
# or
bun fastapi-dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The FastApi server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

## How It Works

The Python/FastAPI server is mapped into to Next.js app under `/api/`.

This is implemented using `next.config.js` rewrites to map any request to `/api/:path*` to the FastAPI API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:8000` port, which is where the FastAPI server is running.