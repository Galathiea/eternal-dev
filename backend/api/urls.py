# backend/api/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Assuming you have a views.py in your 'users' app where RegisterView is defined
from users.views import RegisterView # <-- IMPORT YOUR REGISTER VIEW HERE

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ⭐ ADD THIS LINE FOR REGISTRATION!
    # This will match /api/auth/register/ and directly use RegisterView from users.views
    path('auth/register/', RegisterView.as_view(), name='register'),

    path('recipes/', include('recipes.urls')),
    path('reviews/', include('reviews.urls')),
    path('cart/', include('cart.urls')),
    # If your 'users.urls' contains OTHER user-related API endpoints that are NOT auth,
    # you might still keep 'path('users/', include('users.urls'))'.
    # But for auth-related paths, it's often clearer to define them here in api/urls.py.
    # If users.urls only contains 'register/', then the line below is redundant.
    path('users/', include('users.urls')), # Keep this if 'users.urls' has other non-auth paths like profile, etc.
]