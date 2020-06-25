from django.shortcuts import render
from django.views.generic.detail import DetailView

def index(request):
    return render(request, template_name='index.html')

