from django.db import models
from datetime import timedelta

class Session(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    expiration_time = models.DateTimeField(default=models.F('time') + timedelta(days=1))
    user_profile = models.CharField(max_length=255)  # Assuming it's a comma-separated string

    def __str__(self):
        return self.user_profile