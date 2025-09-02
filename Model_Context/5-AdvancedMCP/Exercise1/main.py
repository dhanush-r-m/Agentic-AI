from search_pipeline import run_search
from context_handler import ContextHandler

def mcp_search_pipeline():
    context = ContextHandler()

    # First query
    query1 = "Latest AI agent frameworks in 2025"
    results1 = run_search(query1)
    context.add_context(query1, results1)

    print("\n=== First Search ===")
    print("Query:", query1)
    for r in results1:
        print("-", r["title"], ":", r["href"])

    # Second query (depends on context)
    query2 = "Compare with LangChain alternatives"
    results2 = run_search(query2)
    context.add_context(query2, results2)

    print("\n=== Second Search ===")
    print("Query:", query2)
    for r in results2:
        print("-", r["title"], ":", r["href"])

    # Validate context preservation
    print("\n=== Context History ===")
    for item in context.get_full_context():
        print(f"Query: {item['query']}, Results: {len(item['results'])}")

if __name__ == "__main__":
    mcp_search_pipeline()
