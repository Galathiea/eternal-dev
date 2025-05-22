# C:\Users\Galathiea\Downloads\KITCHEN WEB\eternal-dev\backend\recipes\urls.py
from django.urls import path
# Make sure you import all three views from .views
from .views import RecipeCreateView, RecipeListView, RecipeDetailView

urlpatterns = [
    # This will be /api/recipes/ (for listing and creating)
    path('', RecipeListView.as_view(), name='recipe-list'),
    path('create/', RecipeCreateView.as_view(), name='recipe-create'),

    # This will be /api/recipes/<int:pk>/ (for retrieve, update, delete)
    path('<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
]