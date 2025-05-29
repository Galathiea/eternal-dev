from rest_framework import serializers
from .models import Cart, CartItem
from recipes.serializers import RecipeSerializer

class CartItemSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)
    recipe_id = serializers.IntegerField(write_only=True, source='recipe.id')
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = [
            'id', 
            'recipe', 
            'recipe_id', 
            'quantity', 
            'price_at_time_of_addition',
            'total_price',
            'added_at'
        ]
        read_only_fields = ['id', 'price_at_time_of_addition', 'added_at', 'total_price']

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
        return value

    def validate_recipe_id(self, value):
        from recipes.models import Recipe
        try:
            recipe = Recipe.objects.get(id=value)
            return recipe
        except Recipe.DoesNotExist:
            raise serializers.ValidationError("Recipe not found")

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id', 
            'user', 
            'items', 
            'total_price', 
            'item_count',
            'created_at', 
            'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_item_count(self, obj):
        return sum(item.quantity for item in obj.items.all())