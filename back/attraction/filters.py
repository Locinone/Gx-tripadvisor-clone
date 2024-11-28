from django_filters import rest_framework as filters
from .models import Attraction
from django.db.models import Q

class AttractionFilter(filters.FilterSet):
    keyword = filters.CharFilter(field_name="name", lookup_expr="icontains")
    min_price_level = filters.NumberFilter(field_name="price_level", lookup_expr="gte")
    max_price_level = filters.NumberFilter(field_name="price_level", lookup_expr="lte")
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")
    max_rating = filters.NumberFilter(field_name="rating", lookup_expr="lte")
    city = filters.CharFilter(field_name="city", lookup_expr="icontains")
    country = filters.CharFilter(field_name="country", lookup_expr="icontains")
    min_num_reviews = filters.NumberFilter(field_name="num_reviews", lookup_expr="gte")
    min_photo_count = filters.NumberFilter(field_name="photo_count", lookup_expr="gte")
    open_period = filters.CharFilter(method='filter_open_period')
    profile_type = filters.CharFilter(method='filter_profile_type')
    radius = filters.NumberFilter(method='filter_radius')

    class Meta:
        model = Attraction
        fields = ['category', 'city', 'country', 'keyword', 'min_price_level', 'max_price_level', 'min_rating', 'max_rating', 'min_num_reviews', 'min_photo_count', 'open_period', 'profile_type', 'radius']

    def filter_open_period(self, queryset, name, value):
        day, time_range = value.split(':')
        open_time, close_time = time_range.split('-')
        return queryset.filter(
            Q(hours__periods__open__day=day) &
            Q(hours__periods__open__time__lte=open_time) &
            Q(hours__periods__close__day=day) &
            Q(hours__periods__close__time__gte=close_time)
        )

    def filter_profile_type(self, queryset, name, value):
        request = self.request
        if value == 'local':
            radius = request.query_params.get('radius', 10)
            return self.filter_radius(queryset, 'radius', radius, request)
        elif value == 'tourist':
            city = request.query_params.get('city')
            if city:
                return queryset.filter(city__icontains=city)
        elif value == 'professional':
            return queryset.none()
        return queryset

    def filter_radius(self, queryset, name, value, request=None):
        if request is None:
            request = self.request
        user_lat = request.query_params.get('latitude')
        user_lon = request.query_params.get('longitude')
        if user_lat and user_lon:
            user_lat = float(user_lat)
            user_lon = float(user_lon)
            radius = float(value)
            return queryset.filter(
                Q(latitude__isnull=False) & Q(longitude__isnull=False) &
                Q(latitude__range=(user_lat - radius, user_lat + radius)) &
                Q(longitude__range=(user_lon - radius, user_lon + radius))
            )
        return queryset