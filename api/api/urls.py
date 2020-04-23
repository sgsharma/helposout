from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.conf.urls import include, url
from rest_framework import routers

from .views import JobViewSet, OrganizationViewSet, PartnerViewSet, ApplicantViewSet

router = routers.DefaultRouter()
router.register('jobs', JobViewSet)
router.register('orgs', OrganizationViewSet)
router.register('partners', PartnerViewSet)
router.register('applicants', PartnerViewSet)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
