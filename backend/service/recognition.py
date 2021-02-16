import dlib
import cv2
from scipy.spatial import distance

arr = []
with open("descriptors.txt") as file_handler:
    for line in file_handler:
        temp = {
            "name": line.split(' ')[1],
            "descriptor": [float(temp) for temp in line.split(' ')[0].split(';')]
        }
        arr.append(temp)

sp = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
facerec = dlib.face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')
detector = dlib.get_frontal_face_detector()


def recognition(frame):
    res_str = ""
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