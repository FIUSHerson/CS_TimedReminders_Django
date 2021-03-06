"""CS_StoredTime_Django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from StoredTime import views
from StoredTime.views import TimeList

urlpatterns = [
    path('', TimeList.as_view(template_name = 'main.html'), name='time-list'),
    path('add/', views.add, name='add'),
    path('countdown/', TimeList.as_view(template_name = 'countdown.html'), name='countdown'),
    path('admin/', admin.site.urls),
    path('delete/', views.delete, name='yeetus-deletus'),
    path('create/', views.create, name='create')
]

urlpatterns += staticfiles_urlpatterns()
