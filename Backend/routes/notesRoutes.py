from flask import Blueprint, jsonify, request
from controllers.notesController import get_note_list

notes_bp = Blueprint("notes", __name__)


@notes_bp.route("/notes", methods=["GET"])
def notes_list():
    notes = get_note_list()
    return jsonify(notes), 200
