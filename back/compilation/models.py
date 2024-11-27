from django.db import models
from decimal import Decimal
from django.conf import settings
from attraction.models import Attraction

class Compilation(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='compilation_compilations')
    attractions = models.ManyToManyField(Attraction, related_name='compilation_attractions')
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Enregistrez d'abord l'instance pour obtenir un ID
        self.total_cost = sum([attraction.price_level for attraction in self.attractions.all()])
        super().save(*args, **kwargs)  # Enregistrez à nouveau pour mettre à jour total_cost

    def __str__(self):
        return f"Compilation {self.id} for {self.user}"