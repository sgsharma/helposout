from rest_framework import generics, permissions, viewsets

from .models import Job
from .serializers import JobSerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = JobSerializer
