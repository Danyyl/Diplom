import base64
import imutils
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from io import StringIO
import io
from PIL import Image
import numpy
import cv2

from backend.service.app.recognition import recognition
from backend.service.app.add_description import create

from backend.service.app import app
from backend.service.app import socketio
from backend.service.app.models import User


@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == "GET":
        print(User.query.all())
        return render_template('add.html')
    if request.method == "POST":
        data_image = request.json['image_data']
        name = request.json['name']
        b = io.BytesIO(base64.b64decode(data_image))
        pimg = Image.open(b)
        pimg = numpy.array(pimg)
        frame = imutils.resize(pimg, width=700)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = create(frame, name)
        return {'result': result}


@app.route('/', methods=['POST', 'GET'])
def index():
    print("index")
    return render_template('index.html')


@socketio.on('image')
def image(data_image):
    sbuf = StringIO()
    sbuf.write(data_image)

    # decode and convert into image
    b = io.BytesIO(base64.b64decode(data_image))
    pimg = Image.open(b)
    pimg = numpy.array(pimg)
    # Convert RGB to BGR
    # Process the image frame
    frame = imutils.resize(pimg, width=700)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    frame, res_str = recognition(frame)

    imgencode = cv2.imencode('.jpg', frame)[1]

    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', (stringData, res_str))