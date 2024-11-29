from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import get_db_handle
from .serializers import CacheDocumentSerializer

SESSION_CACHE = 'cache_session'

def get_db_connection():
    db_name = 'session'
    host = 'localhost'
    port = 27017
    username = ''
    password = ''
    return get_db_handle(db_name, host, port, username, password)

@api_view(['GET'])
def test_mongo_connection(request):
    db_handle, client = get_db_connection()

    # Test the connection by fetching a collection
    try:
        collection_names = db_handle.list_collection_names()
        return HttpResponse(f"Connected to MongoDB! Collections: {collection_names}")
    except Exception as e:
        return HttpResponse(f"Failed to connect to MongoDB: {str(e)}")
    
@api_view(['GET'])
def fetch_cache_collection(request):
    db_handle, client = get_db_connection()

    try:
        cache_collection = db_handle[SESSION_CACHE]
        documents = list(cache_collection.find())
        for doc in documents:
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        serializer = CacheDocumentSerializer(documents, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": f"Failed to fetch documents: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def add_session(request):
    db_handle, client = get_db_connection()

    try:
        cache_collection = db_handle[SESSION_CACHE]
        serializer = CacheDocumentSerializer(data=request.data)
        if serializer.is_valid():
            cache_collection.insert_one(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Failed to add document: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_session(request, session_id):
    db_handle, client = get_db_connection()

    try:
        cache_collection = db_handle[SESSION_CACHE]
        result = cache_collection.delete_one({'_id': session_id})
        if result.deleted_count == 1:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"Failed to delete document: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
