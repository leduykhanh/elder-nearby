from rest_framework import serializers

class MessageSerializzer(serializers.Serializer):
    text = serializers.CharField(max_length=50)
    time_added = serializers.CharField(max_length=50)
