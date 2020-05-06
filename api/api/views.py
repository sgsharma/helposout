from rest_framework import generics, permissions, viewsets
from django.core import serializers
from rest_framework.response import Response

from .models import CustomUser, Job, Organization
from .permissions import IsOwnerOrReadOnly
from .serializers import (JobSerializer, OrganizationSerializer
                          )


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.values() # pylint: disable=no-member
    permission_classes = [permissions.IsAuthenticated, ]
    filterset_fields = ['owner', 'org']

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

    # def list(self, request):
        # queryset = Job.objects.values() # pylint: disable=no-member
        # return Response(queryset)

    def retrieve(self, request, pk):
        queryset = Job.objects.filter(id=pk).values().first() # pylint: disable=no-member
        queryset['owner_name'] = CustomUser.objects.filter(id=queryset.get('owner_id')).values('first_name', 'last_name')
        queryset['org_name'] = Organization.objects.filter(name=queryset.get('org_id')).values('name', 'org_url')
        return Response(queryset)

    def perform_create(self, serializer):
        serializer.save(org=self.request.user.organization)

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = OrganizationSerializer