import anthropic
from .base import ProviderBase

class AnthropicProvider(ProviderBase):
    def __init__(self, api_key: str):
        self.client = anthropic.Anthropic(api_key=api_key)

    async def generate(self, prompt: str, **kwargs) -> str:
        response = self.client.messages.create(
            model=kwargs.get("model", "claude-3-haiku-20240307"),
            max_tokens=kwargs.get("max_tokens", 200),
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
