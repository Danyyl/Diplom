from django.urls import path, include, re_path
from . import views
from rest_framework import routers
from core.views import UserViewSet, AddressViewSet, CompanyViewSet, TagViewSet, ServiceViewSet, \
    ServiceTagViewSet, \
    InputFormViewSet, InputDataViewSet, InputFileDataViewSet, OutputDataViewSet, OutputFileDataViewSet,\
    CompanyReviewViewSet, ServiceReviewViewSet, PersonReviewViewSet, ProfileViewSet


router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('profile', ProfileViewSet, basename='profile')
router.register('address', AddressViewSet, basename='address')
router.register('company', CompanyViewSet, basename='Company')
router.register('tag', TagViewSet, basename='Tag')
router.register('service', ServiceViewSet, basename='Service')
router.register('service_tag', ServiceTagViewSet, basename='ServiceTag')
router.register('input_form', InputFormViewSet, basename='InputForm')
router.register('input_data', InputDataViewSet, basename='InputData')
router.register('input_file_data', InputFileDataViewSet, basename='InputFileData')
router.register('output_data', OutputDataViewSet, basename='OutputData')
router.register('output_file_data', OutputFileDataViewSet, basename='OutputFileData')
router.register('company_review', CompanyReviewViewSet, basename='CompanyReview')
router.register('service_review', ServiceReviewViewSet, basename=' ServiceReview')
router.register('person_review', PersonReviewViewSet, basename='PersonReview')



urlpatterns = [
    path('', include(router.urls)),
]