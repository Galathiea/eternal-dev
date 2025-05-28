# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # ⭐ This line tells Django to look for more URL patterns in 'api.urls'
    #    when the URL starts with 'api/'.
    path('api/', include('api.urls')),
]

# This is for serving media files during development.
# Keep this as is.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)