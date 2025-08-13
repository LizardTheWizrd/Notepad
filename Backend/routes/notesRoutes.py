from flask import Blueprint, jsonify, request
from controllers.notesController import (
    get_note_list,
    get_note_contents,
    create_note,
    update_note,
)

notes_bp = Blueprint("notes", __name__)


notes_bp.route("/notes", methods=["GET"])(get_note_list)
notes_bp.route("/notes/<int:note_id>", methods=["GET"])(get_note_contents)
notes_bp.route("/notes", methods=["POST"])(create_note)
notes_bp.route("/notes", methods=["PUT"])(update_note)
