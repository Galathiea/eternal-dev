from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('', views.CartView.as_view(), name='cart'),
    path('items/', views.CartItemCreateView.as_view(), name='cart-item-create'),
    path('items/<int:pk>/', views.CartItemUpdateView.as_view(), name='cart-item-update'),
    path('items/<int:pk>/delete/', views.CartItemDeleteView.as_view(), name='cart-item-delete'),
    path('clear/', views.clear_cart, name='cart-clear'),
    path('count/', views.cart_count, name='cart-count'),
]