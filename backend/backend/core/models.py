from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from core.managers import CustomUserManager


TYPE_OF_SERVICE = (
    ('Health', 'Health'),
    ('Transport', 'Transport'),
    ('Food', 'Food'),
    ('Entertainment', 'Entertainment'),
    ('Government', 'Government'),
)


INPUT_STATUS = (
    ('Required', 'Required'),
    ('Filled', 'Filled'),
    ('Example', 'Example'),
)


SERVICE_STATUS = (
    ('Processed', 'Processed'),
    ('Done', 'Done'),
    ('Example', 'Example'),
)


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        _('email address'),
        unique=True
    )
    first_name = models.CharField(
        max_length=40
    )
    last_name = models.CharField(
        max_length=40
    )
    face_id = models.IntegerField(
        null=True
    )
    is_active = models.BooleanField(
        default=True
    )
    is_staff = models.BooleanField(
        default=True
    )
    date_joined = models.DateTimeField(
        default=timezone.now
    )
    role = models.CharField(
        null=True,
        blank=True,
        choices=(
            ('Business', 'Business'),
            ('Simple', 'Simple'),
        ),
        default='Simple',
        max_length=24
    )
    rate = models.FloatField(
        default=0
    )
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = _("User")


class Address(models.Model):
    address_line = models.CharField(
        max_length=40
    )


class Company(models.Model):
    name = models.CharField(
        max_length=30,
    )
    owner = models.ForeignKey(
        CustomUserModel,
        on_delete=models.CASCADE,
        related_name='companies'
    )
    description = models.CharField(
        max_length=300,
        blank=True,
        default=""
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE,
        related_name='companies'
    )
    contact_info = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )
    rate = models.FloatField(
        default=0
    )

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(
        max_length=30
    )

    def __str__(self):
        return self.name


class Service(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='services'
    )
    name = models.CharField(
        max_length=30
    )
    description = models.CharField(
        max_length=200,
        blank=True,
        default=""
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_OF_SERVICE
    )
    status = models.CharField(
        max_length=30,
        choices=SERVICE_STATUS
    )
    rate = models.FloatField(
        default=0
    )

    def __str__(self):
        return self.name


class ServiceTag(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='tags'
    )
    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE,
        related_name='services'
    )

    def __str__(self):
        return self.tag.name


class InputForm(models.Model):
    name = name = models.CharField(
        max_length=100
    )
    info = models.TextField(
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=20,
        choices=INPUT_STATUS
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='input_forms'
    )

    def __str__(self):
        return self.name


class InputData(models.Model):
    name = models.CharField(
        max_length=100
    )
    data = models.TextField(
        blank=True,
        default=""
    )
    info = models.TextField(
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=20,
        choices=INPUT_STATUS
    )
    form = models.ForeignKey(
        InputForm,
        on_delete=models.CASCADE,
        related_name='input_fields'
    )

    def __str__(self):
        return self.name


class InputFileData(models.Model):
    name = models.CharField(
        max_length=100
    )
    data = models.FileField(
        upload_to='uploads/'
    )
    info = models.TextField(
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=20,
        choices=INPUT_STATUS
    )
    form = models.ForeignKey(
        InputForm,
        on_delete=models.CASCADE,
        related_name='input_file_fields'
    )

    def __str__(self):
        return self.name


class OutputData(models.Model):
    name = models.CharField(
        max_length=100
    )
    data = models.TextField(
        blank=True,
        default=""
    )
    info = models.TextField(
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=20,
        choices=INPUT_STATUS
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='outputs'
    )

    def __str__(self):
        return self.name


class OutputFileData(models.Model):
    name = models.CharField(
        max_length=100
    )
    data = models.FileField(
        upload_to='uploads/'
    )
    info = models.TextField(
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=20,
        choices=INPUT_STATUS
    )
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='file_outputs'
    )

    def __str__(self):
        return self.name


class CompanyReview(models.Model):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rate = models.FloatField(
        default=0
    )
    text = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return 'Rate - {}'.format(str(self.rate))


class ServiceReview(models.Model):
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rate = models.FloatField(
        default=0
    )
    text = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return 'Rate - {}'.format(str(self.rate))


class PersonReview(models.Model):
    user = models.ForeignKey(
        CustomUserModel,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rate = models.FloatField(
        default=0
    )
    text = models.TextField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return 'Rate - {}'.format(str(self.rate))




