from django.urls import path

from . import views

from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'm', views.MessageViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [

]

urlpatterns = [
    path('data', views.data, name='data'),
    path('add_message', views.add_message, name='add_message'),
    # path('', views.index, name='index'),
    path('', include(router.urls))
]
