from django.contrib import admin
from .models import Recipe, Review
from cart.models import Cart 

admin.site.register(Recipe)
admin.site.register(Review)
admin.site.register(Cart)
