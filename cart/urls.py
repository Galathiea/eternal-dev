from django.urls import path
from .views import CartView, CartItemCreateView, CartItemDeleteView

urlpatterns = [
    path('cart', CartView.as_view(), name='cart'),
    path('items/', CartItemCreateView.as_view(), name='cart-items'),
    path('items/<int:pk>/', CartItemDeleteView.as_view(), name='cart-item-delete'),
]