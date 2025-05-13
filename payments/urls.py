from django.urls import path
from .views import CreatePaymentIntentView, CreateOrderView, CreateOrderItemView, CreatePaymentView

urlpatterns = [
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('orders/', CreateOrderView.as_view(), name='create-order'),
    path('order-items/', CreateOrderItemView.as_view(), name='create-order-item'),
    path('payments/', CreatePaymentView.as_view(), name='create-payment'),
]