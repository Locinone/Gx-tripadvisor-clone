from django.urls import path
from .views import get_compilations, get_compilation, user_compilations

urlpatterns = [
    path('compilations/', get_compilations, name='get_compilations'),
    path('compilations/<int:pk>/', get_compilation, name='get_compilation'),
    path('compilations/user/<int:user_id>/', user_compilations, name='user_compilations'),
]