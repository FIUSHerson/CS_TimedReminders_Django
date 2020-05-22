from django.shortcuts import render
from django.http import HttpResponse

def main(request):
    return render(request, 'main.html')
    
def add(request):
    return render(request, 'add.html')

def countdown(request):
    return render(request, 'countdown.html')

