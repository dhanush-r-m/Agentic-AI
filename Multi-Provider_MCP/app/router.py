import random

class Router:
    def __init__(self, providers):
        self.providers = providers

    def select_provider(self, metadata: dict):
        # Simple example: pick based on request attributes
        if metadata.get("low_latency"):
            return self.providers["openai"]
        elif metadata.get("cheap"):
            return self.providers["local"]
        elif metadata.get("high_quality"):
            return self.providers["anthropic"]
        else:
            return random.choice(list(self.providers.values()))
