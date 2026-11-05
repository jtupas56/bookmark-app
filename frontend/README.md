# FastAPI + React

## Run locally

Start the backend from the `backend` directory:

```bash
uv run fastapi dev
```

In another terminal, start the frontend from the `frontend` directory:

```bash
npm run dev
```

Open the frontend URL printed by Vite. The Vite development server forwards
requests to `/api` to the FastAPI server at `http://127.0.0.1:8000`, where the
backend's `/` route provides the response.
