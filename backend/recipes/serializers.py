# serializers.py (recipes app)
from rest_framework import serializers
from .models import Recipe
import requests
from django.core.files.base import ContentFile
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import imghdr
from rest_framework.exceptions import ValidationError

class RecipeSerializer(serializers.ModelSerializer):
    image_url = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Recipe
        fields = ('id', 'user', 'title', 'description', 'prep_time', 'cook_time', 'servings', 'created_at', 'image', 'image_url')
        read_only_fields = ('user', 'id', 'created_at')

    def create(self, validated_data):
        image_url = validated_data.pop('image_url', None)
        recipe = Recipe.objects.create(**validated_data)

        if image_url:
            try:
                response = requests.get(image_url, stream=True)
                response.raise_for_status()

                image_content = response.content
                image_type = imghdr.what(None, image_content)

                if image_type:
                    file_name = f"{recipe.id}.{image_type}"
                    content_file = ContentFile(image_content, name=file_name)
                    recipe.image.save(file_name, content_file)
                else:
                    raise ValidationError("Invalid image URL: Could not determine image type.")

            except requests.exceptions.RequestException as e:
                raise ValidationError(f"Error downloading image: {e}")

        return recipe

    def update(self, instance, validated_data):
        image_url = validated_data.pop('image_url', None)
        instance = super().update(instance, validated_data)

        if image_url:
            try:
                response = requests.get(image_url, stream=True)
                response.raise_for_status()

                image_content = response.content
                image_type = imghdr.what(None, image_content)

                if image_type:
                    file_name = f"{instance.id}.{image_type}"
                    content_file = ContentFile(image_content, name=file_name)
                    instance.image.save(file_name, content_file)
                else:
                    raise ValidationError("Invalid image URL: Could not determine image type.")

            except requests.exceptions.RequestException as e:
                raise ValidationError(f"Error downloading image: {e}")

        return instance