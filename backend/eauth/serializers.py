from rest_framework import serializers
from .models import User
class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email','username','subscription', 'balance', 'translates_done')
        read_only_fields = ('email',)
