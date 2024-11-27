from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Compilation
from .serializers import CompilationSerializer

@api_view(['GET', 'POST'])
def get_compilations(request):
    if request.method == 'GET':
        compilations = Compilation.objects.all().order_by('id')
        serializer = CompilationSerializer(compilations, many=True)
        return Response({"compilations": serializer.data})
    elif request.method == 'POST':
        serializer = CompilationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def get_compilation(request, pk):
    compilation = get_object_or_404(Compilation, id=pk)
    if request.method == 'GET':
        serializer = CompilationSerializer(compilation, many=False)
        return Response({"compilation": serializer.data})
    elif request.method == 'PUT':
        serializer = CompilationSerializer(compilation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        compilation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def user_compilations(request, user_id):
    compilations = Compilation.objects.filter(user_id=user_id)
    serializer = CompilationSerializer(compilations, many=True)
    return Response({"compilations": serializer.data})