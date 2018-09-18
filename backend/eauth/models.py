from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    subscription = models.CharField(max_length=200, default='basic')
    balance = models.IntegerField(default=20)
    translates_done = models.IntegerField(default=0)
