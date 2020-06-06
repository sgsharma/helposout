from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from .views import (JobViewSet, OrganizationViewSet)

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'jobs/?', JobViewSet, 'jobs')
router.register(r'orgs/?', OrganizationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/v1/?', include(router.urls)),
    re_path(r'^api/auth/?', include('rest_auth.urls')),
    url(r'^api/auth/registration/?', include('rest_auth.registration.urls')),
    url(r'^accounts/', include('allauth.urls'))
]