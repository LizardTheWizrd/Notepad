import psycopg2
from config.dbConnectionString import Config
from flask import request, jsonify

config = Config()


def get_note_list():
    try:
        conn = psycopg2.connect(config.DATABASE_URI)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM get_note_list();")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        notes = [{"id": row[0], "title": row[1]} for row in rows]
        return jsonify(notes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_note_contents(note_id):
    try:
        conn = psycopg2.connect(config.DATABASE_URI)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM get_note_contents(%s);", (note_id,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()

        if row:
            note = {"id": row[0], "title": row[1], "body": row[2]}
            return jsonify(note), 200
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def create_note():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"error": "Note text cannot be empty"}), 400

    # Split first line as title, rest as body
    lines = text.split("\n", 1)
    p_title = lines[0].strip()
    p_body = lines[1].strip() if len(lines) > 1 else ""

    if not p_title:
        return jsonify({"error": "Title cannot be empty"}), 400

    try:
        conn = psycopg2.connect(config.DATABASE_URI)
        cursor = conn.cursor()
        cursor.execute("select create_note(%s, %s);", (p_title, p_body))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Note created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def update_note():
    data = request.get_json()
    note_id = data.get("id")
    text = data.get("text", "").strip()

    if not note_id:
        return jsonify({"error": "Note ID is required"}), 400

    if not text:
        return jsonify({"error": "Note text cannot be empty"}), 400

    # Split first line as title, rest as body
    lines = text.split("\n", 1)
    p_title = lines[0].strip()
    p_body = lines[1].strip() if len(lines) > 1 else ""

    if not p_title:
        return jsonify({"error": "Title cannot be empty"}), 400

    try:
        conn = psycopg2.connect(config.DATABASE_URI)
        cursor = conn.cursor()
        cursor.execute("SELECT update_note(%s, %s, %s);", (note_id, p_title, p_body))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Note updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
