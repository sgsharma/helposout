from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.conf.urls import include, url
from rest_framework import routers

from .views import JobViewSet, OrganizationViewSet, PartnerViewSet, ApplicantViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'jobs/?', JobViewSet)
router.register(r'orgs/?', OrganizationViewSet)
router.register(r'partners/?', PartnerViewSet)
router.register(r'applicants/?', ApplicantViewSet)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
