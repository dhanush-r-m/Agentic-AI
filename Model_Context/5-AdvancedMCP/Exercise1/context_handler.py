class ContextHandler:
    def __init__(self):
        self.history = []

    def add_context(self, query, results):
        """Store query and results in history"""
        self.history.append({"query": query, "results": results})

    def get_last_context(self):
        """Retrieve the last query/results for continuity"""
        return self.history[-1] if self.history else None

    def get_full_context(self):
        """Return all accumulated context"""
        return self.history
