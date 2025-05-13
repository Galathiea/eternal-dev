from django.urls import path
from . import views

urlpatterns = [
    path('categories', views.category_list, name='category_list'),
    path('<int:pk>/', views.category_detail, name='category_detail'),
    # Add more URLs as needed
]