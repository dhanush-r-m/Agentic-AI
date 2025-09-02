from .base import ProviderBase

class LocalProvider(ProviderBase):
    async def generate(self, prompt: str, **kwargs) -> str:
        # Placeholder for a local LLM (e.g., llama.cpp, Ollama)
        return f"[Local Model Reply] to: {prompt}"

