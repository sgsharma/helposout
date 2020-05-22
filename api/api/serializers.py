from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext_lazy as _
from rest_framework import exceptions, serializers
from rest_framework.exceptions import ValidationError

from .models import CustomUser, Job, Organization

# Get the UserModel
UserModel = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        

class LoginSerializer(serializers.Serializer):
    """
    Modified django-rest-auth LoginSerializer
    at `rest_auth/serializers.py`
    to remove username and make email required
    and disable authentication without allauth.
    """

    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):
        return authenticate(self.context['request'], **kwargs)

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = None

        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account import app_settings

            # Authentication through email
            if app_settings.AUTHENTICATION_METHOD == app_settings.AuthenticationMethod.EMAIL: # pylint: disable=no-member
                user = self._validate_email(email, password)

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        # If required, is the email verified?
        if 'rest_auth.registration' in settings.INSTALLED_APPS:
            from allauth.account import app_settings
            if app_settings.EMAIL_VERIFICATION == app_settings.EmailVerificationMethod.MANDATORY: # pylint: disable=no-member
                email_address = user.emailaddress_set.get(email=user.email)
                if not email_address.verified:
                    raise serializers.ValidationError(_('E-mail is not verified.'))

        attrs['user'] = user
        return attrs


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
        if obj:
            name = CustomUser.objects.filter(id=obj.owner_id).values('first_name', 'last_name')
            return name
        else:
            return

    def get_org_name(self, obj):
        name = Organization.objects.filter(name=obj.org_id).values('name', 'org_url') # pylint: disable=no-member
        return name

    class Meta:
        model = Job
        fields = '__all__'


class OrganizationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    org_url = serializers.URLField(required=True)

    def validate_name(self, value):
        """
        Check if the org name already exists 
        """
        orgs = Organization.objects.values('name') # pylint: disable=no-member
        if value in orgs:
            raise serializers.ValidationError('Organization {} already exists.'.format(value))
        else:
            return value

    def validate_org_url(self, value):
        """
        Check if the url already exists 
        """
        orgs = Organization.objects.values('org_url') # pylint: disable=no-member
        if value in orgs:
            raise serializers.ValidationError('Organization {} already exists.'.format(value))
        return value     

    class Meta:
        model = Organization
        fields = '__all__'