from rest_framework import serializers, status
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class ShortCompanySerializer(serializers.ModelSerializer):
    address = AddressSerializer(many=False)

    class Meta:
        model = Company
        fields = '__all__'


class PersonReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonReview
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    companies = ShortCompanySerializer(many=True, read_only=True)
    reviews = PersonReviewSerializer(many=True)

    class Meta:
        model = CustomUserModel
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ServiceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceReview
        fields = '__all__'


class ServiceTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTag
        fields = '__all__'


class InputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputData
        fields = '__all__'


class InputFileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputFileData
        fields = '__all__'


class InputFormSerializer(serializers.ModelSerializer):
    input_fields = InputDataSerializer(many=True)
    input_file_fields = InputFileDataSerializer(many=True)

    class Meta:
        model = InputForm
        fields = '__all__'


class OutputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputData
        fields = '__all__'


class OutputFileDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputFileData
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    reviews = ServiceReviewSerializer(many=True)
    outputs = OutputDataSerializer(many=True)
    file_outputs = OutputFileDataSerializer(many=True)
    inputs = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'

    def get_tags(self, obj):
        objects = [temp.tag for temp in ServiceTag.objects.filter(service=obj)]
        serializer = TagSerializer(objects, many=True)
        return serializer.data

    def get_inputs(self, obj):
        form = InputForm.objects.filter(service=obj).last()
        objects = InputData.objects.filter(form=form)
        serializer = InputDataSerializer(objects, many=True)
        return serializer.data

    def get_user(self, obj):
        if obj.user:
            return f"{obj.user.first_name}  {obj.user.last_name}"
        return ""

    def get_company(self, obj):
        return obj.company.name


class CompanyReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyReview
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    reviews = CompanyReviewSerializer(many=True)
    address = AddressSerializer(many=False)

    class Meta:
        model = Company
        fields = '__all__'
