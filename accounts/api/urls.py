from django.urls import path, re_path, include
from knox.views import LogoutView

from .views import UserAPIView, RegisterAPIView, LoginAPIView, OrganizationViewSet
from rest_framework import renderers

org_list = OrganizationViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
org_detail = OrganizationViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
org_highlight = OrganizationViewSet.as_view({
    'get': 'highlight'
}, renderer_classes=[renderers.StaticHTMLRenderer])

urlpatterns = [
    # path('', include('knox.urls')),
    re_path(r'user/?', UserAPIView.as_view()),
    re_path(r'register/?', RegisterAPIView.as_view()),
    re_path(r'login/?', LoginAPIView.as_view()),
    re_path(r'logout/?', LogoutView.as_view(), name='knox_logout'),
    re_path(r'orgs/?', org_list, name='org-list'),
    re_path(r'orgs/<int:pk>/?', org_detail, name='org-detail'),
    re_path(r'orgs/<int:pk>/highlight/?', org_highlight, name='org-highlight'),
]
