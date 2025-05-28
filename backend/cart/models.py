# cart/models.py
from django.db import models
from django.conf import settings
from recipes.models import Recipe

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price_at_time_of_addition = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cart', 'recipe')

    def __str__(self):
        return f"{self.quantity} x {self.recipe.title} in {self.cart.user.username}'s cart"

    @property
    def total_price(self):
        return self.quantity * self.price_at_time_of_addition