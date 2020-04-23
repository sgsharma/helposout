from django.conf.urls import include, url
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from .views import (ApplicantViewSet, JobViewSet, OrganizationViewSet,
                    PartnerViewSet)

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'jobs/?', JobViewSet)
router.register(r'orgs/?', OrganizationViewSet)
router.register(r'partners/?', PartnerViewSet)
router.register(r'applicants/?', ApplicantViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/v1/', include(router.urls)),
    re_path(r'^', TemplateView.as_view(template_name="index.html")),
]
