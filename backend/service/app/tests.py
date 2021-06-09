from django.test import TestCase
from .recognition import recognition_dlib


class TestService(TestCase):
    def test_recognition(self):
        image = ""
        with open("test_image.png", 'r') as f:
            image = f.read()
        result = ""
        with open("test_result.png", 'r') as f:
            result = f.read()
        result_frame, result_text = recognition_dlib(image)
        self.assertEqual(result_frame, result)
        self.assertEqual(result_text, "1")



