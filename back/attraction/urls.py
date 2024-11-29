from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, get_attractions, get_attraction, fetch_and_store_attractions

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('get_tripadvisor/', fetch_and_store_attractions, name='fetch_and_store_attractions'),
    path('get_attractions/', get_attractions, name='get_attractions'),
    path('get_attraction/<int:pk>/', get_attraction, name='get_attraction'),
]