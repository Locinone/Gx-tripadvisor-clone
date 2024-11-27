from django.urls import path
from .views import get_attractions, get_attraction

urlpatterns = [
    path('attractions/', get_attractions, name='get_attractions'),
    path('attractions/<int:pk>/', get_attraction, name='get_attraction'),
]