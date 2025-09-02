import redis
import hashlib
import json

class Cache:
    def __init__(self, host="localhost", port=6379):
        self.client = redis.Redis(host=host, port=port, decode_responses=True)

    def _make_key(self, prompt, metadata):
        raw_key = json.dumps({"prompt": prompt, "metadata": metadata}, sort_keys=True)
        return hashlib.sha256(raw_key.encode()).hexdigest()

    def get(self, prompt, metadata):
        return self.client.get(self._make_key(prompt, metadata))

    def set(self, prompt, metadata, value, ttl=3600):
        self.client.set(self._make_key(prompt, metadata), value, ex=ttl)
