# import base64
# import imutils
# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit
# from io import StringIO
# import io
# from PIL import Image
# from flask_cors import CORS
# import numpy
# import cv2
#
# from backend.service.app.recognition import recognition
#
#
# app = Flask(__name__)
# CORS(app)
# socketio = SocketIO(app)
#
#
# @app.route('/', methods=['POST', 'GET'])
# def index():
#     print("index")
#     return render_template('index.html')
#
#
# @socketio.on('image')
# def image(data_image):
#     sbuf = StringIO()
#     sbuf.write(data_image)
#
#     # decode and convert into image
#     b = io.BytesIO(base64.b64decode(data_image))
#     pimg = Image.open(b)
#     pimg = numpy.array(pimg)
#     # Convert RGB to BGR
#     #pimg = cv2.cvtColor(pimg, cv2.COLOR_RGB2BGR)
#     # Process the image frame
#     frame = imutils.resize(pimg, width=700)
#     frame, res_str = recognition(frame)
#
#     imgencode = cv2.imencode('.jpg', frame)[1]
#
#     # base64 encode
#     stringData = base64.b64encode(imgencode).decode('utf-8')
#     b64_src = 'data:image/jpg;base64,'
#     stringData = b64_src + stringData
#
#     # emit the frame back
#     emit('response_back', (stringData, res_str))
#
#
# if __name__ == '__main__':
#     socketio.run(app, host='127.0.0.1', debug=True)