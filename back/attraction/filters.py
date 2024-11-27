from django_filters import rest_framework as filters
from .models import Attraction

class AttractionFilter(filters.FilterSet):
    keyword = filters.CharFilter(field_name="name", lookup_expr="icontains")
    min_price_level = filters.NumberFilter(field_name="price_level", lookup_expr="gte")
    max_price_level = filters.NumberFilter(field_name="price_level", lookup_expr="lte")
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")
    max_rating = filters.NumberFilter(field_name="rating", lookup_expr="lte")
    city = filters.CharFilter(field_name="city", lookup_expr="icontains")
    country = filters.CharFilter(field_name="country", lookup_expr="icontains")

    class Meta:
        model = Attraction
        fields = ['category', 'city', 'country', 'keyword', 'min_price_level', 'max_price_level', 'min_rating', 'max_rating']