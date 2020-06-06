from django.conf.urls import include, url
from django.urls import path, re_path

print("Hi")
urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('api.urls')),
]