# C:\Users\Galathiea\OneDrive\Documents\eternal-dev\backend\users\models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    # Add these lines to resolve the clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups', # Changed from 'users_custom_user_set' for brevity, but still unique
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions', # Changed from 'users_custom_permission_set' for brevity, but still unique
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username