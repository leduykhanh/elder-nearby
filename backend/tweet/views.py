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
    t_list = []
    for t in Translate.objects.all()[:10]:
        text = str(t.user) + ' translated ' + t.translated_text
        t_list.append(MessageSerializzer(Message(text=text, time_added=t.time_added)).data)
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data + t_list})

@csrf_exempt
def add_message(request):
    data = json.loads(request.body.decode('utf-8'))
    for message in reversed(data.get("messages")):
        m = Message(text=message)
        m.save()
    data_list = Message.objects.order_by('-time_added')[:10]
    return JsonResponse({'data':MessageSerializzer(data_list, many=True).data})

def translate(request):
    data = json.loads(request.body.decode('utf-8'))
    user = request.user
    if (user.balance == 0):
        return JsonResponse({'message': 'NO_BALANCE'}, status=400)
    user.translates_done = user.translates_done + 1
    user.balance = user.balance - 1
    user.save()
    target = str(data.get("target"))
    text = str(data.get("text"))
    result = translate_text(target, text)
    trans = Translate(text=text,
            user=user,
            language =result["detectedSourceLanguage"],
            target = target,
            translated_text = result['translatedText'])
    trans.save()
    return JsonResponse({'data':result['translatedText'], 'language': result["detectedSourceLanguage"]})
