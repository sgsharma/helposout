from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from .views import (KnoxLoginView, KnoxRegisterView, JobViewSet, OrganizationViewSet, catchall)

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'jobs/?', JobViewSet, 'jobs')
router.register(r'orgs/?', OrganizationViewSet)

urlpatterns = [
    re_path(r'admin/?', admin.site.urls),
    re_path(r'^api/v1/?', include(router.urls)),
    url(r'^api/auth/login/', KnoxLoginView.as_view()),
    url(r'^api/auth/register/', KnoxRegisterView.as_view()),
    re_path(r'^api/auth/?', include('rest_auth.urls')),
    # url(r'^api/auth/registration/?', include('rest_auth.registration.urls'))
    url(r'^accounts/', include('allauth.urls')),
    # re_path(r'', catchall)
]