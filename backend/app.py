from flask import Flask
from routes.notesRoutes import notes_bp  # adjust if your file has a different name

app = Flask(__name__)
app.register_blueprint(notes_bp)

if __name__ == "__main__":
    app.run(debug=True)
