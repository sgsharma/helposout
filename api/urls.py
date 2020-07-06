from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from .views import (JobViewSet)
from knox.views import LogoutView

router = routers.DefaultRouter()
router = routers.DefaultRouter(trailing_slash=False)
router.register(r'jobs/?', JobViewSet, 'jobs')

urlpatterns = [
    re_path(r'admin/?', admin.site.urls),
    re_path(r'^api/v1/?', include(router.urls)),
]