from django.db import models


class Message(models.Model):
    text = models.CharField(max_length=50)
    time_added = models.DateTimeField(auto_now_add=True)
