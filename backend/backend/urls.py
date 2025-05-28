"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# ⭐ NEW IMPORTS FOR MEDIA FILES ⭐
from django.conf import settings
from django.conf.urls.static import static
# ⭐ END NEW IMPORTS ⭐

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('users/', include('users.urls')),
        path('recipes/', include('recipes.urls')),
        path('reviews/', include('reviews.urls')),
        path('cart/', include('cart.urls')),
        path('categories/', include('categories.urls')),
        path('', include('api.urls')),  # This will include our main API endpoints
    ])),
]

# ⭐⭐⭐ ADD THESE LINES TO SERVE MEDIA FILES IN DEVELOPMENT ⭐⭐⭐
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # You might also want to serve static files this way in development, if needed
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# ⭐⭐⭐ END MEDIA FILE SERVING CONFIGURATION ⭐⭐⭐