from django.urls import path

from . import views

urlpatterns = [
    path('register_by_access_token/<slug:backend>/', views.register_by_access_token, name='login'),
]
