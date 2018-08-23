from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
import json

from .lib.snippets import translate_text
# Create your views here.

def index(request):
    return HttpResponse("home")

def data(request):
    data_list = Message.objects.order_by('-time_added')[:10]
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data})

@csrf_exempt
def add_message(request):
    data = json.loads(request.body.decode('utf-8'))
    for message in reversed(data.get("messages")):
        m = Message(text=message)
        m.save()
    data_list = Message.objects.order_by('-time_added')[:10]
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data})

@csrf_exempt
def translate(request):
    data = json.loads(request.body.decode('utf-8'))
    target = str(data.get("target"))
    text = str(data.get("text"))
    result = translate_text(target, text)
    trans = Translate(text=text,
            language =result["detectedSourceLanguage"],
            target = target,
            translated_text = result['translatedText'])
    trans.save()
    return JsonResponse({'data':result['translatedText']})
