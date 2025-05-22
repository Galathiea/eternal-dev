from django.contrib import admin
from .models import Review
from cart.models import Cart 

admin.site.register(Review)
admin.site.register(Cart)
