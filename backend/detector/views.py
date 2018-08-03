from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse, JsonResponse
import base64
from .classify_image import predicts


# Create your views here.

@csrf_exempt
def predict(request):
    data = json.loads(request.body.decode('utf-8'))
    png_recovered = base64.decodestring(data["image"].encode())

    return JsonResponse({'data': predicts(png_recovered)})
