import base64
import imutils
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from io import StringIO
from flask_cors import CORS, cross_origin
import io
from PIL import Image
import numpy
import cv2

from .recognition import recognition_dlib, recognition_haar, recognition_face_recognition, \
    recognition_mtcnn
from .add_description import create

from . import app
from . import socketio
from .models import User


@app.route('/delete', methods=['GET'])
def delete():
    users = User.query.all()
    for user in users:
        user.delete(user)
    print(User.query.all())
    return render_template('default.html')


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
@cross_origin()
def image(data_image):
    sbuf = StringIO()
    sbuf.write(data_image['image'])
    res_str = ""
    # decode and convert into image
    b = io.BytesIO(base64.b64decode(data_image['image']))
    pimg = Image.open(b)
    pimg = numpy.array(pimg)
    # Convert RGB to BGR
    # Process the image frame
    frame = imutils.resize(pimg, width=700)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    if data_image['method'] == '0':
        frame, res_str = recognition_dlib(frame)
    if data_image['method'] == '1':
        frame, res_str = recognition_haar(frame)
    if data_image['method'] == '2':
        frame, res_str = recognition_face_recognition(frame)
    if data_image['method'] == '3':
        frame, res_str = recognition_mtcnn(frame)

    imgencode = cv2.imencode('.jpg', frame)[1]

    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', (stringData, res_str))