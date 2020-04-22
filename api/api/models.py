# from address.models import AddressField
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .manager import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    is_partner = models.BooleanField(default=False)
    is_applicant = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Organization(models.Model):
    name = models.CharField(max_length=50)
    company_url = models.URLField(max_length=200)
    # location1 = AddressField() # install this first to make it work https://github.com/furious-luke/django-address
    # location2 = AddressField(related_name='+', blank=True, null=True)
 

class Partner(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    company = models.ForeignKey(Organization, on_delete=models.CASCADE)


class Applicant(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    github_url = models.URLField(max_length=200)
    linkedin_url = models.URLField(max_length=200)
    portfolio_url = models.URLField(max_length=200)
    skills = models.CharField(max_length=255) # with this answer https://stackoverflow.com/questions/29526511/allow-dynamic-choice-in-django-choicefield
    current_employer = models.CharField(max_length=200, null=True, blank=False)


class Job(models.Model):
    title = models.CharField(max_length=50)
    category = models.CharField(max_length=255) # with this answer https://stackoverflow.com/questions/29526511/allow-dynamic-choice-in-django-choicefield
    remote_ok = models.BooleanField(default=False)
    skills = models.CharField(max_length=255) # with this answer https://stackoverflow.com/questions/29526511/allow-dynamic-choice-in-django-choicefield
    description = models.TextField()
    job_type = models.CharField(max_length=255)
    paid = models.BooleanField(default=True)
    salary = models.DecimalField(decimal_places=2, max_digits=8)
    created_at = models.DateTimeField(auto_now_add=True) # https://stackoverflow.com/questions/3429878/automatic-creation-date-for-django-model-form-objects
    updated_at = models.DateTimeField(auto_now=True)
    posted_by = models.ForeignKey(Partner, on_delete=models.CASCADE)
