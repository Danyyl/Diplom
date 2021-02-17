from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from backend.service.app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate



app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)


from backend.service.app import routers, models

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', debug=True)