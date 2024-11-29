# urls.py
from django.urls import path
from .views import test_mongo_connection, fetch_cache_collection, add_session

urlpatterns = [
    path('test-mongo-connection/', test_mongo_connection, name='test_mongo_connection'),
    path('fetch-cache-collection/', fetch_cache_collection, name='fetch_cache_collection'),
    path('add/', add_session, name='add_session'),
]