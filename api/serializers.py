from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext_lazy as _
# from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer
from rest_framework import exceptions, serializers
from rest_framework.exceptions import ValidationError

from .models import Job
from accounts.models import User, Organization


class JobSerializer(serializers.ModelSerializer):
    print("JobSerializer")
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    org = serializers.HiddenField(default=None)

    def validate_job_url(self, value):
        """
        Check if the job url already exists 
        """
        jobs = Job.objects.values('job_url') # pylint: disable=no-member
        if value in jobs:
            raise serializers.ValidationError('Job webpage {} already exists.'.format(value))
        return value

    class Meta:
        model = Job
        fields = '__all__'


class JobListSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    org = serializers.HiddenField(default=None)
    owner_name = serializers.SerializerMethodField('get_owner_name')
    org_name = serializers.SerializerMethodField('get_org_name')

    def validate_job_url(self, value):
        """
        Check if the job url already exists 
        """
        jobs = Job.objects.values('job_url') # pylint: disable=no-member
        if value in jobs:
            raise serializers.ValidationError('Job webpage {} already exists.'.format(value))
        return value

    def get_owner_name(self, obj):
        name = accounts.User.objects.filter(id=obj.owner_id).values('first_name', 'last_name')
        return name

    def get_org_name(self, obj):
        name = Organization.objects.filter(name=obj.org_id).values('name', 'org_url') # pylint: disable=no-member
        return name

    class Meta:
        model = Job
        fields = '__all__'