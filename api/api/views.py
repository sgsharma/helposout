from rest_framework import generics, permissions, viewsets

from .models import Job, Organization, Partner, Applicant
from .serializers import JobSerializer, OrganizationSerializer, PartnerSerializer, ApplicantSerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = JobSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = OrganizationSerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = PartnerSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all() # pylint: disable=no-member
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ApplicantSerializer