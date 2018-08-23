from django.urls import path

from . import views

urlpatterns = [
    path('data', views.data, name='data'),
    path('add_message', views.add_message, name='add_message'),
    path('translate', views.translate, name='translate'),
    path('', views.index, name='index'),
]
