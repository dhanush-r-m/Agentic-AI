from fastapi import FastAPI, Request
from app.providers.openai_provider import OpenAIProvider
from app.providers.anthropic_provider import AnthropicProvider
from app.providers.local_provider import LocalProvider
from app.router import Router
from app.cache import Cache
from app.dashboard import router as dashboard_router
import sqlite3

app = FastAPI()
cache = Cache()


providers = {
    "openai": OpenAIProvider(api_key="OPENAI_KEY"),
    "anthropic": AnthropicProvider(api_key="ANTHROPIC_KEY"),
    "local": LocalProvider()
}
router = Router(providers)


def log_usage(provider):
    conn = sqlite3.connect("usage.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS usage (provider TEXT)")
    cursor.execute("INSERT INTO usage (provider) VALUES (?)", (provider,))
    conn.commit()
    conn.close()

@app.post("/generate")
async def generate(request: Request):
    data = await request.json()
    prompt = data["prompt"]
    metadata = data.get("metadata", {})

    # Check cache
    cached = cache.get(prompt, metadata)
    if cached:
        return {"response": cached, "provider": "cache"}

    provider = router.select_provider(metadata)
    response = await provider.generate(prompt, **metadata)

    cache.set(prompt, metadata, response)
    log_usage(provider.__class__.__name__)

    return {"response": response, "provider": provider.__class__.__name__}



app.include_router(dashboard_router)
