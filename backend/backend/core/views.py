from django.shortcuts import render
import requests
from rest_framework import viewsets, status
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview

from core.serializers import UserSerializer, AddressSerializer, CompanySerializer, TagSerializer, ServiceSerializer, \
    ServiceTagSerializer, \
    InputFormSerializer, InputDataSerializer, InputFileDataSerializer, OutputDataSerializer, OutputFileDataSerializer, \
    CompanyReviewSerializer, ServiceReviewSerializer, PersonReviewSerializer
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUserModel.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.validated_data['image']
        name = serializer.validated_data['first_name']
        url = ""
        obj = {
            "image": image,
            "name": name,
        }
        face_id = requests.post(url, obj)
        if not face_id:
            return Response("Something wrong with photo", status=status.HTTP_400_BAD_REQUEST)
        serializer.validated_data["face_id"] = face_id
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = CustomUserModel.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        user.first_name = request.data["first_name"]
        user.last_name = request.data["last_name"]
        user.email = request.data["email"]
        user.save()
        return Response(status=status.HTTP_200_OK)

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(pk=user.pk)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        address = Address.objects.create(address_line=request.data["address"])
        company = Company.objects.create(
            name=request.data["name"],
            description=request.data["description"],
            contact_info=request.data["contact_info"],
            address=address,
            owner=user,
        )
        serializer = CompanySerializer(instance=company)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        company = Company.objects.get(pk=pk)
        company.name = request.data["name"]
        company.description = request.data["description"]
        company.contact_info = request.data["contact_info"]
        company.address.address_line = request.data["address"]
        company.save()
        serializer = CompanySerializer(instance=company)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def list(self, request, *args, **kwargs):
        user = request.user
        if request.GET.get("status") == "vip":
            services = Service.objects.filter(company__owner=user)
        elif request.GET.get("status") == "custom":
            temp_user = CustomUserModel.objects.get(email=request.GET["email"])
            services = Service.objects.filter(company__owner=user, user=temp_user)
        elif request.GET.get("all"):
            services = Service.objects.filter(status="Example")
        elif request.GET.get("my"):
            services = Service.objects.filter(user=user)
        else:
            services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        service = Service.objects.filter(name=request.data["name"]).last()
        try:
            user = CustomUserModel.objects.get(pk=request.data["user"])
        except:
            user = None
        service = Service.objects.create(
            name=service.name,
            description=service.description,
            type=service.type,
            status=request.data['status'],
            company=service.company,
            user=user,
        )
        service.save()
        form = InputForm.objects.create(service=service, name="Default", type="Example")
        form.save()
        serializer = ServiceSerializer(instance=service)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None, *args, **kwargs):
        if request.data["status"] == "Done":
            service = Service.objects.get(pk=pk)
            service.status = "Done"
            service.save()
            form = InputForm.objects.filter(service=service).last()
            InputData.objects.filter(form=form).update(type="Filled")
            OutputData.objects.filter(service=service).update(type="Filled")
            return Response("Done", status=status.HTTP_200_OK)
        elif request.data["status"] == "Required":
            pass
        else:
            service = Service.objects.get(pk=pk)
            service.name = request.data["name"]
            service.description = request.data["description"]
            service.type = request.data["type"]
            service.save()
            serializer = ServiceSerializer(instance=service)
            return Response(serializer.data, status=status.HTTP_200_OK)


class ServiceTagViewSet(viewsets.ModelViewSet):
    queryset = ServiceTag.objects.all()
    serializer_class = ServiceTagSerializer


class InputFormViewSet(viewsets.ModelViewSet):
    queryset = InputForm.objects.all()
    serializer_class = InputFormSerializer


class InputDataViewSet(viewsets.ModelViewSet):
    queryset = InputData.objects.all()
    serializer_class = InputDataSerializer

    def create(self, request, *args, **kwargs):
        service = Service.objects.get(id=request.data["service"])
        form = InputForm.objects.filter(service=service).last()
        data = {
            "name": request.data["name"],
            "data": request.data["data"],
            "info": request.data["info"],
            "type": "Example",
            "form": form.pk,
        }
        serializer = InputDataSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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

    def create(self, request, *args, **kwargs):
        user = CustomUserModel.objects.get(email=request.data["user"])
        p_review = PersonReview.objects.create(user=user, rate=request.data["rate"], text=request.data["text"])
        reviews = PersonReview.objects.filter(user=user)
        rate = 0
        for review in reviews:
            rate += review.rate
        user.rate = rate//len(reviews)
        user.save()
        serializer = PersonReviewSerializer(instance=p_review)
        return Response(serializer.data, status=status.HTTP_200_OK)
