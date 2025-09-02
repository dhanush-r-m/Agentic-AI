import openai
from .base import ProviderBase

class OpenAIProvider(ProviderBase):
    def __init__(self, api_key: str):
        openai.api_key = api_key

    async def generate(self, prompt: str, **kwargs) -> str:
        response = openai.chat.completions.create(
            model=kwargs.get("model", "gpt-4o-mini"),
            messages=[{"role": "user", "content": prompt}],
            max_tokens=kwargs.get("max_tokens", 200)
        )
        return response.choices[0].message.content