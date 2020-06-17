import os

from allauth.account import app_settings as allauth_settings
from allauth.account.utils import complete_signup
from django.conf import settings
from django.core import serializers
from django.shortcuts import render
from django.views.generic import TemplateView
from knox.models import AuthToken
from rest_auth.registration.views import RegisterView
from rest_auth.views import LoginView
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response

from .models import CustomUser, Job, Organization
from .permissions import IsOwnerOrReadOnly
from .serializers import (CustomRegisterSerializer, CustomUserSerializer,
                          JobListSerializer, JobSerializer, KnoxSerializer,
                          OrganizationSerializer)
from .utils import create_knox_token

catchall = TemplateView.as_view(template_name='index.html')


class KnoxLoginView(LoginView):

    def get_response(self):
        serializer_class = self.get_response_serializer()

        data = {
            'user': self.user,
            'token': self.token
        }
        serializer = serializer_class(instance=data, context={'request': self.request})

        return Response(serializer.data, status=200)


class KnoxRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def get_response_data(self, user):
        return KnoxSerializer({'user': user, 'token': self.token}).data

    def perform_create(self, serializer):
        print(self.request.json())
        user = serializer.save(self.request)
        self.token = create_knox_token(None, user, None)
        complete_signup(self.request._request, user, allauth_settings.EMAIL_VERIFICATION, None)
        return user


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobListSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Job.objects.all().order_by('-updated_at')

    def __init__(self, *args, **kwargs):
        super(JobViewSet, self).__init__(*args, **kwargs)
        self.serializer_action_classes = {
            'list':JobListSerializer,
            'create':JobListSerializer,
            'retrieve':JobListSerializer,
            'update':JobListSerializer,
            'partial_update':JobListSerializer,
            'destroy':JobSerializer,
        }

    def perform_create(self, serializer):
        serializer.save(org=self.request.user.organization)

    def perform_update(self, serializer):
        serializer.save(org=self.request.user.organization)

    def get_serializer_class(self, *args, **kwargs):
        """Instantiate the list of serializers per action from class attribute (must be defined)."""
        kwargs['partial'] = True
        try:
            print(self.serializer_action_classes[self.action])
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super(JobViewSet, self).get_serializer_class()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            return [permissions.AllowAny(), ]        
        if self.action == 'retrieve' or self.action == 'create':
            return [permissions.IsAuthenticated(), ]
        if self.action == 'update' or self.action == 'destroy' or self.action == 'partial_update':
            return [IsOwnerOrReadOnly(), ]
        return super(JobViewSet, self).get_permissions()


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = OrganizationSerializer
