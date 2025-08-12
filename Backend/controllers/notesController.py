import psycopg2
from config.dbConnectionString import Config

config = Config()


def get_note_list():
    conn = psycopg2.connect(config.DATABASE_URI)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM get_note_list();")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return [{"id": row[0], "title": row[1]} for row in rows]


def get_note_contents(note_id):
    conn = psycopg2.connect(config.DATABASE_URI)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM get_note_contents(%s);", (note_id,))
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if row:
        return {"id": row[0], "title": row[1], "body": row[2]}
    return None
