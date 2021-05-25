from django.shortcuts import render
from rest_framework import viewsets
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview

from core.serializers import UserSerializer, AddressSerializer, CompanySerializer, TagSerializer, ServiceSerializer, \
    ServiceTagSerializer, \
    InputFormSerializer, InputDataSerializer, InputFileDataSerializer, OutputDataSerializer, OutputFileDataSerializer, \
    CompanyReviewSerializer, ServiceReviewSerializer, PersonReviewSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUserModel.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = CustomUserModel.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return self.queryset.filter(pk=user.pk)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ServiceTagViewSet(viewsets.ModelViewSet):
    queryset = ServiceTag.objects.all()
    serializer_class = ServiceTagSerializer


class InputFormViewSet(viewsets.ModelViewSet):
    queryset = InputForm.objects.all()
    serializer_class = InputFormSerializer


class InputDataViewSet(viewsets.ModelViewSet):
    queryset = InputData.objects.all()
    serializer_class = InputDataSerializer


class InputFileDataViewSet(viewsets.ModelViewSet):
    queryset = InputFileData.objects.all()
    serializer_class = InputFileDataSerializer


class OutputDataViewSet(viewsets.ModelViewSet):
    queryset = OutputData.objects.all()
    serializer_class = OutputDataSerializer


class OutputFileDataViewSet(viewsets.ModelViewSet):
    queryset = OutputFileData.objects.all()
    serializer_class = OutputFileDataSerializer


class CompanyReviewViewSet(viewsets.ModelViewSet):
    queryset = CompanyReview.objects.all()
    serializer_class = CompanyReviewSerializer


class ServiceReviewViewSet(viewsets.ModelViewSet):
    queryset = ServiceReview.objects.all()
    serializer_class = ServiceReviewSerializer


class PersonReviewViewSet(viewsets.ModelViewSet):
    queryset = PersonReview.objects.all()
    serializer_class = PersonReviewSerializer
