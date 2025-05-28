from django.urls import path
from .views import CartView, CartItemCreateView, CartItemDeleteView

urlpatterns = [
    path('', CartView.as_view(), name='user-cart'), # GET user's cart
    path('create/', CartItemCreateView.as_view(), name='add-to-cart'), # POST to add item
    path('delete/<int:pk>/', CartItemDeleteView.as_view(), name='update-cart-item'), # PUT/PATCH quantity
]