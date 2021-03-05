import dlib
import cv2
import datetime
from scipy.spatial import distance
import PIL.Image
import PIL.ImageDraw
import face_recognition as fr
from mtcnn import MTCNN

from backend.service.app.models import User


def get_users():
    arr = []

    for user in User.query.all():
        temp = {
            "name": user.full_name,
            "descriptor": [float(temp) for temp in user.descriptor.split(';')]
        }
        arr.append(temp)
    return arr

sp = dlib.shape_predictor('./app/shape_predictor_68_face_landmarks.dat')
facerec = dlib.face_recognition_model_v1('./app/dlib_face_recognition_resnet_model_v1.dat')
detector = dlib.get_frontal_face_detector()
faceCascade = cv2.CascadeClassifier('./app/haarcascade_frontalface_default.xml')
detector_mtcnn = MTCNN()


def recognition_dlib(frame):
    res_str = ""
    arr = get_users()
    if not frame is None:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        dets_webcam = detector(image, 1)
        for k, d in enumerate(dets_webcam):
            shape = sp(image, d)
            color = (0, 0, 255)
            text = 'unknown'
            face_descriptor2 = facerec.compute_face_descriptor(image, shape)
            for desr in arr:
                a = distance.euclidean(desr['descriptor'], face_descriptor2)
                if a < 0.6:
                    color = (255, 0, 0)
                    text = desr['name']
            res_str += text + str(color) + "\n"
            cv2.rectangle(frame, (d.left(), d.top()), (d.right(), d.bottom()), color, 2)
            cv2.putText(frame, text, (d.left() - 50, d.top() - 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, lineType=cv2.LINE_AA)
    return frame, res_str


def recognition_haar(frame):
    res_str = ""
    arr = get_users()
    if not frame is None:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = faceCascade.detectMultiScale(
            frame,
            scaleFactor=1.2,
            minNeighbors=5,
            minSize=(20, 20)
        )
        for (x, y, w, h) in faces:
            shape = sp(image, dlib.rectangle(x, y, x+w, y+h))
            color = (0, 0, 255)
            text = 'unknown'
            face_descriptor2 = facerec.compute_face_descriptor(image, shape)
            for desr in arr:
                a = distance.euclidean(desr['descriptor'], face_descriptor2)
                if a < 0.6:
                    color = (255, 0, 0)
                    text = desr['name']
            res_str += text + str(color) + "\n"
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(frame, text, (x - 50, y - 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, lineType=cv2.LINE_AA)
    return frame, res_str


def recognition_face_recognition(frame):
    res_str = ""
    arr = get_users()
    if not frame is None:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_loc = fr.face_locations(image)
        for (top, right, bottom, left) in face_loc:
            shape = sp(image, dlib.rectangle(left, top, right, bottom))
            color = (0, 0, 255)
            text = 'unknown'
            face_descriptor2 = facerec.compute_face_descriptor(image, shape)
            for desr in arr:
               a = distance.euclidean(desr['descriptor'], face_descriptor2)
               if a < 0.6:
                   color = (255, 0, 0)
                   text = desr['name']
            cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
            cv2.putText(frame, text, (left-50, top-50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, lineType=cv2.LINE_AA)
    return frame, res_str


def recognition_mtcnn(frame):
    res_str = ""
    arr = get_users()
    if not frame is None:
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        dets_webcam = detector_mtcnn.detect_faces(image)
        for d in dets_webcam:
            x, y, w, h = d['box']
            shape = sp(image, dlib.rectangle(x, y, x + w, y + h))
            color = (0, 0, 255)
            text = 'unknown'
            face_descriptor2 = facerec.compute_face_descriptor(image, shape)
            for desr in arr:
                a = distance.euclidean(desr['descriptor'], face_descriptor2)
                if a < 0.6:
                    color = (255, 0, 0)
                    text = desr['name']
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(frame, text, (x - 50, y - 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, color, lineType=cv2.LINE_AA)
    return frame, res_str