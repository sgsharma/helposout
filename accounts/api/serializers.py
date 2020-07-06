from django.contrib.auth import authenticate

from rest_framework import serializers
from ..models import Organization
from django.contrib.auth import get_user_model
User = get_user_model()

# User._meta.get_field('email')._unique = True


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


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