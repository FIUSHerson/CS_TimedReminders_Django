from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return render(request, 'home.html')

def countdown(request):
    return render(request, 'countdown.html')