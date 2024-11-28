from rest_framework import serializers
from .models import Compilation, Attraction

class CompilationSerializer(serializers.ModelSerializer):
    attractions = serializers.PrimaryKeyRelatedField(queryset=Attraction.objects.all(), many=True)

    class Meta:
        model = Compilation
        fields = ['user', 'attractions', 'budget', 'total_cost', 'created_at']