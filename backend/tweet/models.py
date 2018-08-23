from django.db import models


class Message(models.Model):
    text = models.CharField(max_length=500)
    time_added = models.DateTimeField(auto_now_add=True)

class Translate(models.Model):
    text = models.CharField(max_length=200)
    language = models.CharField(max_length=3)
    target = models.CharField(max_length=3)
    translated_text = models.CharField(max_length=200)
    time_added = models.DateTimeField(auto_now_add=True)
