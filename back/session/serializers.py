from rest_framework import serializers

class CacheDocumentSerializer(serializers.Serializer):
    _id = serializers.CharField()
    time = serializers.DateTimeField()
    expiration_time = serializers.DateTimeField()
    user_profile = serializers.ListField(
        child=serializers.CharField()
    )