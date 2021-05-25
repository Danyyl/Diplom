from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from app_code.app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate



app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app_code.app import routers
from app_code.app import models

if __name__ == '__main__':
    socketio.run(app, host='localhost', debug=True)