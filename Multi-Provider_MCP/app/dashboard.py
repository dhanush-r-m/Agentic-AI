from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from jinja2 import Environment, FileSystemLoader
import sqlite3

router = APIRouter()
env = Environment(loader=FileSystemLoader("templates"))

@router.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    conn = sqlite3.connect("usage.db")
    cursor = conn.cursor()
    cursor.execute("SELECT provider, COUNT(*) FROM usage GROUP BY provider")
    stats = cursor.fetchall()
    template = env.get_template("dashboard.html")
    return template.render(stats=stats)
