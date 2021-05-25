from rest_framework import serializers, status
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview


class ShortCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    companies = ShortCompanySerializer(many=True, read_only=True)

    class Meta:
        model = CustomUserModel
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'



class ServiceTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTag
        fields = '__all__'


class InputFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputForm
        fields = '__all__'


class InputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputData
        fields = '__all__'


class InputFileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputFileData
        fields = '__all__'


class OutputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputData
        fields = '__all__'


class OutputFileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputFileData
        fields = '__all__'


class CompanyReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyReview
        fields = '__all__'


class ServiceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceReview
        fields = '__all__'


class PersonReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonReview
        fields = '__all__'
