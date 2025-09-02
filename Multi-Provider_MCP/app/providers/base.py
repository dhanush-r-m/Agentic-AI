from abc import ABC, abstractmethod

class ProviderBase(ABC):
    @abstractmethod
    async def generate(self, prompt: str, **kwargs) -> str:
        pass
