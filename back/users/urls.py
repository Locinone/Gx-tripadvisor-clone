from django.urls import path
from .views import get_users, get_user

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/<int:pk>/', get_user, name='get_user'),
]