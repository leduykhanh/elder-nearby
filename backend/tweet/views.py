from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def index(request):
    return HttpResponse("home")

def data(request):
    data_list = Message.objects.order_by('-time_added')
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data})

@csrf_exempt
def add_message(request):
    data = json.loads(request.body.decode('utf-8'))
    for message in data.get("messages"):
        m = Message(text=message)
        m.save()
    data_list = Message.objects.order_by('-time_added')
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data})
