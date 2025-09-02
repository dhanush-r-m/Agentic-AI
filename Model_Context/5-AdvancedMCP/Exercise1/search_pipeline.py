from duckduckgo_search import DDGS

def run_search(query, num_results=3):
    """Perform a web search"""
    with DDGS() as ddgs:
        results = list(ddgs.text(query, max_results=num_results))
    return results
