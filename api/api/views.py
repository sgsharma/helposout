import os
from rest_framework import generics, permissions, viewsets
from django.core import serializers
from rest_framework.response import Response
from django.shortcuts import render
from django.conf import settings

from .models import CustomUser, Job, Organization
from .permissions import IsOwnerOrReadOnly
from .serializers import (JobSerializer, JobListSerializer, OrganizationSerializer
                          )


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