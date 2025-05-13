from django.urls import path
from .views import RecipeCreateView

urlpatterns = [
    path('recipes', RecipeCreateView.as_view()),  # Add at least one URL pattern
]