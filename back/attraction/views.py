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