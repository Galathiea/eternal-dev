# backend/recipes/serializers.py
from rest_framework import serializers
from .models import Recipe
from categories.models import Category
import requests
from django.core.files.base import ContentFile
import imghdr
from rest_framework.exceptions import ValidationError

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(write_only=True, required=False)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Recipe
        # REMOVE 'user' from here
        fields = (
            'id', 'title', 'description', 'instructions', 'ingredients',
            'prep_time', 'cook_time', 'servings', 'price',
            'category', 'category_id',
            'created_at', 'updated_at',
            'image', 'image_url'
        )
        # REMOVE 'user' from here
        read_only_fields = ('id', 'created_at', 'updated_at', 'category')

    # ... create and update methods remain the same ...