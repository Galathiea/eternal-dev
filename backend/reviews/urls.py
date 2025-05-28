from django.urls import path
from .views import ReviewListCreateView, ReviewDetailView

urlpatterns = [
    path('<int:recipe_id>/reviews/', ReviewListCreateView.as_view(), name='recipe-reviews'),
    path('<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
]