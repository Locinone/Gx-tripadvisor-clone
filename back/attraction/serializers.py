from rest_framework import serializers
from .models import Attraction

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = [
            'location_id', 'name', 'description', 'category', 
            'street1', 'street2', 'city', 'state', 'country', 
            'postalcode', 'address_string', 'latitude', 'longitude', 
            'phone', 'website', 'rating', 'num_reviews', 'photo_count', 
            'price_level', 'hours', 'awards', 'trip_type'
        ]