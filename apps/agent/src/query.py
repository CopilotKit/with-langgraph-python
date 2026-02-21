from langchain.tools import tool
from pathlib import Path
import csv

@tool
def query_data(query: str):
    """
    Query the database, takes natural language. Always call before showing a chart or graph.
    """
    csv_path = Path(__file__).parent / "db.csv"
    with open(csv_path) as f:
        reader = csv.DictReader(f)
        return list(reader)
