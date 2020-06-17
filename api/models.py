# from address.models import AddressField
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from .manager import CustomUserManager


class Organization(models.Model):
    name = models.CharField(max_length=50, primary_key=True, null=False, blank=False)
    org_url = models.URLField('Company URL', max_length=200, blank=False, null=False, unique=True)
    # location1 = AddressField() # TODO @sgsharma install this first to make it work https://github.com/furious-luke/django-address
    # location2 = AddressField(related_name='+', blank=True, null=True)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    is_partner = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, null=False, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Job(models.Model):
    title = models.CharField(max_length=50)
    job_url = models.URLField('Job URL', max_length=200, blank=False, null=False, unique=True)
    category = models.CharField(max_length=255) # TODO @sgsharma make dynamic choice field
    remote_ok = models.BooleanField(default=False)
    skills = models.CharField(max_length=255) # TODO @sgsharma make dynamic choice field
    description = models.TextField()
    job_type = models.CharField(max_length=255)
    paid = models.BooleanField(default=True)
    salary = models.DecimalField(decimal_places=2, max_digits=8)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(CustomUser, related_name='jobs', on_delete=models.CASCADE, null=False, blank=False)
    org = models.ForeignKey(Organization, on_delete=models.CASCADE)


# class Applicant(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
#     github_url = models.URLField(max_length=200)
#     linkedin_url = models.URLField(max_length=200)
#     portfolio_url = models.URLField(max_length=200)
#     skills = models.CharField(max_length=255)
#     current_employer = models.CharField(max_length=200, null=True, blank=False)

# @receiver(post_save, sender=CustomUser)
# def add_org(sender, instance, created, raw=True, *args, **kwargs):
#     print("Hello")
#     org = Organization(name=instance.organization, org_url=instance.org_url)
#     org.save()

# post_save.connect(add_org, sender=CustomUser)