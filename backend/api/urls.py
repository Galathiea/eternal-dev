from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CategoryViewSet, RecipeViewSet,
    ReviewViewSet, CartViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
] 