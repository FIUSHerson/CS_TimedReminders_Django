from django.shortcuts import render, get_object_or_404, redirect
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

def delete(request):
    if request.method == 'POST':
        name = request.GET['id']

        t = TimeTarget.models.get(name=name)
        t.delete()
        return redirect('/')

    return redirect('/')

def create(request):
    if request.method == 'POST':
        name = request.POST.get('nameInput')
        time = request.POST.get('time')

        print(name)
        print(time)

        obj = TimeTarget(name=name, time_targ=time)
        obj.save()
