import stripe
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.conf import settings
from .models import Order, OrderItem, Payment
from .serializers import OrderSerializer, OrderItemSerializer, PaymentSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            amount = request.data['amount']  # Amount in cents
            currency = request.data.get('currency', 'usd')

            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
                automatic_payment_methods={'enabled': True},
            )

            return Response({'clientSecret': intent.client_secret}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CreateOrderItemView(generics.CreateAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class CreatePaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]