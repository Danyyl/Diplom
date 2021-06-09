import dlib
from app_code.app.models import User
from app_code.app import db


def create(image, name):
    sp = dlib.shape_predictor('./app/shape_predictor_68_face_landmarks.dat')
    facerec = dlib.face_recognition_model_v1('./app/dlib_face_recognition_resnet_model_v1.dat')
    detector = dlib.get_frontal_face_detector()
    dets_webcam = detector(image, 1)
    for k, d in enumerate(dets_webcam):
        shape = sp(image, d)
        face_descriptor2 = facerec.compute_face_descriptor(image, shape)
        result = ";".join([str(temp) for temp in face_descriptor2])
        user = User(full_name=name, descriptor=result)
        db.session.add(user)
        db.session.commit()
        user = User.query.get(full_name=name)
        return user.id
    return False
