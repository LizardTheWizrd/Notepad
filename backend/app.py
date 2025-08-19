from flask import Flask
from flask_cors import CORS

from routes.notesRoutes import notes_bp  # adjust if your file has a different name

app = Flask(__name__)
app.register_blueprint(notes_bp)
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
