from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Attraction
from .serializers import AttractionSerializer
from .filters import AttractionFilter
from rest_framework.pagination import PageNumberPagination

@api_view(['GET', 'POST'])
def get_attractions(request):
    if request.method == 'GET':
        filterset = AttractionFilter(request.GET, queryset=Attraction.objects.all().order_by('id'))
        resPerPage = 5
        paginator = PageNumberPagination()
        paginator.page_size = resPerPage
        queryset = paginator.paginate_queryset(filterset.qs, request)
        serializer = AttractionSerializer(queryset, many=True)
        return Response({"attractions": serializer.data})
    elif request.method == 'POST':
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
        serializer = AttractionSerializer(attraction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)