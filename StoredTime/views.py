from django.shortcuts import render
from django.http import HttpResponse

from StoredTime.models import TimeTarget
from django.views.generic.list import ListView

class TimeList(ListView):
    model = TimeTarget


def main(request):
    return render(request, 'main.html')

def add(request):
    return render(request, 'add.html')

def countdown(request):
    return render(request, 'countdown.html')
