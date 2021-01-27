import base64

import cv2
import imutils
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from io import StringIO
import io
from PIL import Image
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

@app.route('/', methods=['POST', 'GET'])
def index():
    print("index")
    return render_template('index.html')

@socketio.on('image')
def image(data_image):
    print("Hello")
    sbuf = StringIO()
    sbuf.write(data_image)

    # decode and convert into image
    b = io.BytesIO(base64.b64decode(data_image))
    pimg = Image.open(b)

    # Process the image frame
    frame = imutils.resize(pimg, width=700)
    frame = cv2.flip(frame, 1)
    imgencode = cv2.imencode('.jpg', frame)[1]

    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', stringData)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)