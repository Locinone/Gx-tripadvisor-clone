from django.db import models

class Attraction(models.Model):
    location_id = models.CharField(max_length=255, unique=True, default='default_location_id')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=255, blank=True)
    
    street1 = models.CharField(max_length=255, blank=True)
    street2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    postalcode = models.CharField(max_length=20, blank=True)
    address_string = models.CharField(max_length=1024, blank=True)

    price_level = models.IntegerField(null=True, blank=True)
    num_reviews = models.IntegerField(null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name