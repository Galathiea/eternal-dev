# cart/serializers.py
from rest_framework import serializers
from .models import Cart, CartItem
# ⭐ IMPORT THE RECIPE MODEL ⭐
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer # Import your RecipeSerializer

class CartItemSerializer(serializers.ModelSerializer):
    # For reading: Displays the full recipe object details
    recipe = RecipeSerializer(read_only=True)
    
    # For writing (POST/PUT): Accepts the recipe ID
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(), write_only=True, source='recipe'
    )
    
    # Read-only field for the item's total price (quantity * price)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ('id', 'recipe', 'recipe_id', 'quantity', 'price', 'total_price')
        read_only_fields = ('price', 'total_price',)

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'total_price', 'created_at', 'updated_at')
        read_only_fields = ('user', 'created_at', 'updated_at', 'total_price')