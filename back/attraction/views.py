from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Attraction
from .serializers import AttractionSerializer
from .filters import AttractionFilter
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
import requests
from django.conf import settings


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all().order_by('id')
    serializer_class = AttractionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AttractionFilter
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        filterset = self.filterset_class(self.request.GET, queryset=queryset, request=self.request)
        return filterset.qs

# ex: http://localhost:8000/api/get_tripadvisor/?name=paris
@api_view(['GET'])
def fetch_and_store_attractions(request):
    query = request.GET.get('name')
    api_key = settings.TRIPADVISOR_API_KEY
    api_url = f"https://api.content.tripadvisor.com/api/v1/location/search?key={api_key}&searchQuery={query}&language=en"
    response = requests.get(api_url)
    # print(response.json())
    if response.status_code == 200:
        attractions_data = response.json()
        for attraction_data in attractions_data['data']:
            # Check if the attraction already exists
            if Attraction.objects.filter(location_id=attraction_data['location_id']).exists():
                continue
            # print(attraction_data)
            detail_response = requests.get(f"https://api.content.tripadvisor.com/api/v1/location/{attraction_data['location_id']}/details?language=en&currency=USD&key={api_key}")
            photo_response = requests.get(f"https://api.content.tripadvisor.com/api/v1/location/{attraction_data['location_id']}/photos?language=en&currency=USD&key={api_key}")
            if (detail_response.status_code == 200) and (photo_response.status_code == 200):
                detail_data = detail_response.json()
                photo_data = photo_response.json()
                fields_to_update = {
                    'picture': photo_data['data'][0]['images']['large']['url'] if photo_data['data'] else 'https://cdn.pixabay.com/photo/2021/06/22/16/39/arch-6356637_1280.jpg',
                    'category': detail_data['subcategory'][0]['name'] if detail_data['subcategory'] else 'N/A',
                    'latitude': detail_data.get('latitude', 'N/A'),
                    'longitude': detail_data.get('longitude', 'N/A'),
                    'phone': detail_data.get('phone', 'N/A'),
                    'website': detail_data.get('website', 'https://www.tripadvisor.fr/'),
                    'rating': detail_data.get('rating', 0),
                    'num_reviews': sum(int(detail_data['review_rating_count'][str(i)]) for i in range(1, 6)) if 'review_rating_count' in detail_data else 0,
                    'photo_count': int(detail_data.get('photo_count', 0)),
                    'trip_type': detail_data.get('trip_types', {"name": "solo", "localized_name": "Solo travel", "value": "511"}),
                    'trip_type': max(detail_data.get('trip_types', []), key=lambda x: x['value'], default={"name": "solo", "localized_name": "Solo travel", "value": "511"}),
                    'street1': attraction_data['address_obj'].get('street1', 'N/A'),
                    'street2': attraction_data['address_obj'].get('street2', 'N/A'),
                    'city': attraction_data['address_obj'].get('city', 'N/A'),
                    'address_string': attraction_data['address_obj'].get('address_string', 'N/A'),
                    'country': attraction_data['address_obj'].get('country', 'N/A'),
                    'postalcode': attraction_data['address_obj'].get('postalcode', 'N/A')
                }
                attraction_data.update(fields_to_update)
            serializer = AttractionSerializer(data=attraction_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response({"error": f"Error saving attraction: {serializer.errors}"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Attractions fetched and stored successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": f"Failed to fetch data from API. Status code: {response.status_code}"}, status=status.HTTP_400_BAD_REQUEST)

# For Front to get all attractions
@api_view(['GET', 'POST'])
def get_attractions(request):
    if request.method == 'GET':
        filterset = AttractionFilter(request.GET, queryset=Attraction.objects.all().order_by('id'), request=request)
        resPerPage = 5
        paginator = PageNumberPagination()
        paginator.page_size = resPerPage
        queryset = paginator.paginate_queryset(filterset.qs, request)
        serializer = AttractionSerializer(queryset, many=True)
        # envoyer en console les données attractions
        print(serializer.data)
        return Response({"attractions": serializer.data})
    elif request.method == 'POST':
        profile_type = request.data.get('profile_type')
        if profile_type != 'professional':
            return Response({"error": "Only professionals can create attractions."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AttractionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def get_attraction(request, pk):
    attraction = get_object_or_404(Attraction, id=pk)
    if request.method == 'GET':
        serializer = AttractionSerializer(attraction, many=False)
        return Response({"attraction": serializer.data})
    elif request.method == 'PUT':
        profile_type = request.data.get('profile_type')
        if profile_type != 'professional':
            return Response({"error": "Only professionals can update attractions."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AttractionSerializer(attraction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)