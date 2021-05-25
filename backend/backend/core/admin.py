from django.contrib import admin
from django import forms
from core.models import CustomUserModel, Address, Company, Tag, Service, ServiceTag, \
    InputForm, InputData, InputFileData, OutputData, OutputFileData, CompanyReview, ServiceReview, PersonReview


admin.site.site_header = "Smart City"


class UserForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].help_text = f"""You can't see original password. For change - type new password here"""

    password = forms.CharField(required=False)

    class Meta:
        model = CustomUserModel
        fields = '__all__'


@admin.register(CustomUserModel)
class CustomUserAdmin(admin.ModelAdmin):
    form = UserForm

    def save_model(self, request, obj, form, change):
        if obj.pk:
            orig_obj = CustomUserModel.objects.get(pk=obj.pk)
            if obj.password != orig_obj.password:
                obj.set_password(obj.password)
        else:
            obj.set_password(obj.password)
        super().save_model(request, obj, form, change)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    pass


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceTag)
class ServiceTagAdmin(admin.ModelAdmin):
    pass


@admin.register(InputForm)
class InputFormAdmin(admin.ModelAdmin):
    pass


@admin.register(InputData)
class InputDataAdmin(admin.ModelAdmin):
    pass


@admin.register(InputFileData)
class InputFileDataAdmin(admin.ModelAdmin):
    pass


@admin.register(OutputData)
class OutputDataAdmin(admin.ModelAdmin):
    pass


@admin.register(OutputFileData)
class OutputFileDataAdmin(admin.ModelAdmin):
    pass


@admin.register(CompanyReview)
class CompanyReviewAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceReview)
class ServiceReviewAdmin(admin.ModelAdmin):
    pass


@admin.register(PersonReview)
class PersonReviewAdmin(admin.ModelAdmin):
    pass

# Register your models here.
