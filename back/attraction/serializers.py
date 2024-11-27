from rest_framework import serializers
from .models import Attraction

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ['location_id', 'name', 'description', 'category', 
                  'street1', 'street2', 'city', 'state', 'country', 
                  'postalcode', 'address_string', 'price_level', 
                  'num_reviews', 'rating', 'image_url']
