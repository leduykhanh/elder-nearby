from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from django.contrib.auth import login
from .serializers import CustomUserDetailsSerializer
from rest_framework.authtoken.models import Token

from social_django.utils import psa

# Define an URL entry to point to this view, call it passing the
# access_token parameter like ?access_token=<token>. The URL entry must
# contain the backend, like this:
#
#   url(r'^register-by-token/(?P<backend>[^/]+)/$',
#       'register_by_access_token')

@psa('social:complete')
def register_by_access_token(request, backend):
    # This view expects an access_token GET parameter, if it's needed,
    # request.backend and request.strategy will be loaded with the current
    # backend and strategy.
    user = request.backend.do_auth(request.GET.get('access_token'))
    if user:
        login(request, user)
        key = ''
        try:
            key = Token.objects.create(user=user).key
        except:
            key = Token.objects.get(user=user).key    
        return JsonResponse({"data": CustomUserDetailsSerializer(user).data, "key": key})
    else:
        return 'ERROR'
