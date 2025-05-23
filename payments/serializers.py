from rest_framework import serializers
from .models import Order, OrderItem, Payment

class OrderItemSerializer(serializers.ModelSerializer):
    recipe_title = serializers.CharField(source='recipe.title', read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'recipe', 'quantity', 'recipe_title')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'total_amount', 'items', 'created_at')
        read_only_fields = ('user', 'created_at')

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'order', 'payment_id', 'amount', 'timestamp', 'status')
        read_only_fields = ('timestamp',)