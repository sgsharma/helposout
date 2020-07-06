from django.conf.urls import include, url
from django.urls import path, re_path


urlpatterns = [
    path('', include('api.urls')),
    path('api/auth/', include('accounts.api.urls')),
    path('', include('frontend.urls')),
]