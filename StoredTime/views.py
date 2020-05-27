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

def delete(request, name):
    myTime = get_object_or_404(TimeTarget, name=name)

    if request.method == 'POST':
        myTime.delete()
        return redirect('/')

    return render(request, 'main.html', {'name': name})

def create(request):
    if request.method == 'POST':
        name = request.POST.get('nameInput', False)
        time = request.POST.get('time', False)

        obj = TimeTarget(name=name, time_targ=time)
        obj.save()
