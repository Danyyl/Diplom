import base64

import cv2
import imutils
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from io import StringIO
import io
from PIL import Image
from flask_cors import CORS
import numpy

import dlib
import cv2
from scipy.spatial import distance

sp = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
facerec = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')
detector = dlib.get_frontal_face_detector()


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

arr = []
with open("descriptors.txt") as file_handler:
    for line in file_handler:
        temp = {
            "name": line.split(' ')[1],
            "descriptor": [float(temp) for temp in line.split(' ')[0].split(';')]
        }
        arr.append(temp)

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
    #pimg = cv2.cvtColor(pimg, cv2.COLOR_RGB2BGR)
    # Process the image frame
    frame = imutils.resize(pimg, width=700)
    if not frame is None:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        dets_webcam = detector(image, 1)
        for k, d in enumerate(dets_webcam):
            #print(k,d)
            shape = sp(image, d)
            color = (0, 0, 255)
            text = 'unknown'
            face_descriptor2 = facerec.compute_face_descriptor(image, shape)
            for desr in arr:
                a = distance.euclidean(desr['descriptor'], face_descriptor2)
                if a < 0.6:
                    color = (255,0,0)
                    text = desr['name']               
            cv2.rectangle(frame, (d.left(), d.top()), (d.right(), d.bottom()), color, 2)
            cv2.putText(frame, text, (d.left()-50, d.top()-50), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, lineType=cv2.LINE_AA)
    imgencode = cv2.imencode('.jpg', frame)[1]

    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', stringData)


if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', debug=True)