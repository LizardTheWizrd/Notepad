from flask import Blueprint, jsonify, request
from controllers.notesController import get_note_list, get_note_contents

notes_bp = Blueprint("notes", __name__)


@notes_bp.route("/notes", methods=["GET"])
def notes_list():
    notes = get_note_list()
    return jsonify(notes), 200


@notes_bp.route("/notes/<int:note_id>", methods=["GET"])
def note_detail(note_id):
    note = get_note_contents(note_id)
    if note:
        return jsonify(note), 200
    return jsonify({"error": "Note not found"}), 404
