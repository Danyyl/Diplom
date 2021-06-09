from django.test import TestCase
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview
from rest_framework import status


def update_company(self):
    user = CustomUserModel.objects.create_user(email='test@te.st', password='test_password')
    self.client.force_login(user=user)
    address = Address.objects.create(address_line='test_address')

    url = '/api/company/'
    data = {'name': 'TestName', 'owner': user, 'description': 'TestDescription',
        'address': address, 'contact_info': 'TestContactInfo', 'rate': 20,}
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response.data['rate'], 0)

    url = '/api/company/'
    data = {
        'name': 'TestName',
        'description': 'TestDescription',
        'address': Address('wrong_address'),
        'contact_info': 'TestContactInfo',
    }
    response = self.client.put(url, data)
    self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    url = '/api/company/'
    data = {
        'name': '',
        'description': 'TestDescription',
        'address': address,
        'contact_info': 'TestContactInfo',
    }
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    url = '/api/company/'
    data = {
        'name': 'TestName',
        'description': 'TestDescription',
        'address': address,
        'contact_info': 'TestContactInfo',
    }
    response = self.client.post(url, data)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
