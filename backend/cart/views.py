from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from recipes.models import Recipe

class CartView(generics.RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class CartItemCreateView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        recipe = serializer.validated_data['recipe']
        quantity = serializer.validated_data.get('quantity', 1)
        
        # Check if item already exists in cart
        existing_item = CartItem.objects.filter(cart=cart, recipe=recipe).first()
        
        if existing_item:
            # Update existing item quantity
            existing_item.quantity += quantity
            existing_item.save()
            return existing_item
        else:
            # Create new cart item with current recipe price
            serializer.save(
                cart=cart,
                price_at_time_of_addition=recipe.price
            )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        recipe = serializer.validated_data['recipe']
        quantity = serializer.validated_data.get('quantity', 1)
        
        # Check if item already exists in cart
        existing_item = CartItem.objects.filter(cart=cart, recipe=recipe).first()
        
        if existing_item:
            # Update existing item quantity
            existing_item.quantity += quantity
            existing_item.save()
            serializer = CartItemSerializer(existing_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Create new cart item with current recipe price
            cart_item = serializer.save(
                cart=cart,
                price_at_time_of_addition=recipe.price
            )
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

class CartItemUpdateView(generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

class CartItemDeleteView(generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def clear_cart(request):
    """Clear all items from user's cart"""
    try:
        cart = Cart.objects.get(user=request.user)
        cart.items.all().delete()
        return Response({'message': 'Cart cleared successfully'}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def cart_count(request):
    """Get total item count in cart"""
    try:
        cart = Cart.objects.get(user=request.user)
        total_items = sum(item.quantity for item in cart.items.all())
        return Response({'count': total_items}, status=status.HTTP_200_OK)
    except Cart.DoesNotExist:
        return Response({'count': 0}, status=status.HTTP_200_OK)