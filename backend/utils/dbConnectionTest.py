import psycopg2
from config.dbConnectionString import Config

config = Config()

try:
    conn = psycopg2.connect(config.DATABASE_URI)

    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    version = cursor.fetchone()

    print("Database connection successful")
    print(f"PostgreSQL version: {version[0]}")
except Exception as e:
    print(f"Database connection failed: {e}")
finally:
    if "conn" in locals() and conn:
        conn.close()
